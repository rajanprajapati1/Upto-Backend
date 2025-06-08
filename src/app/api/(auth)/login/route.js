import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { decrypt } from "@/utils/decrypt";

const JWT_SECRET = process.env.JWT_SECRET || "ME";

export async function POST(req) {
    await connectDB();

    try {
        const body = await req.json();
        const { email, password: encryptedPassword } = body;

        if (!email || !encryptedPassword) {
            return NextResponse.json(
                { success: false, message: "Missing email or password" },
                { status: 400 }
            );
        }

        const decryptedPassword = decrypt(encryptedPassword);

        const user = await User.findOne({ email });

        if (!user || !user.password) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }
        const isValid = await bcrypt.compare(decryptedPassword, user.password);
        if (!isValid) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }
        const payload = {
            id: user._id,
            email: user.email,
        };

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "7d",
        });

        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                createdAt: user.createdAt
            },
            token
        });

        response.cookies.set("UPTO_BC_TOKEN", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });

        return response;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}