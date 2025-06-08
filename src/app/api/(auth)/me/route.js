import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { verify } from "jsonwebtoken";

export async function GET(req) {
    await connectDB();

    try {
        const token = req.cookies.get("UPTO_BC_TOKEN")?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Not authenticated" },
                { status: 401 }
            );
        }

        const decoded = verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({
            success: true,
            user,
        });

    } catch (error) {
        console.error("Auth check error:", error);
        return NextResponse.json(
            { success: false, message: "Invalid token" },
            { status: 401 }
        );
    }
}