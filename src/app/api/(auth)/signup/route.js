import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import { decrypt } from "@/utils/decrypt";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await connectDB();

    try {
        const body = await req.json();
        const { email, password: encryptedPassword, fullName: name } = body;

        if (!email || !encryptedPassword || !name) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const decryptedPassword = decrypt(encryptedPassword);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(decryptedPassword, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return NextResponse.json({
            success: true,
            message: "User created successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            newUser
        });

    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Server error" },
            { status: 500 }
        );
    }
}