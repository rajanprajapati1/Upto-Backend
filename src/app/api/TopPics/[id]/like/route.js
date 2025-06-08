import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TopPic from "@/models/TopPic";

export async function POST(req) {
    await connectDB();
    const url = new URL(req.url);
    const pathnameSegments = url.pathname.split("/");
    const id = pathnameSegments[3];
    const { userId } = await req.json();

    if (!userId) {
        return NextResponse.json(
            { success: false, message: "User ID is required" },
            { status: 400 }
        );
    }

    try {
        const post = await TopPic.findById(id);
        if (!post) {
            return NextResponse.json(
                { success: false, message: "Post not found" },
                { status: 404 }
            );
        }

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
            post.likes.pull(userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();

        return NextResponse.json({
            success: true,
            message: alreadyLiked ? "Unliked post" : "Liked post",
            liked: !alreadyLiked,
            totalLikes: post.likes.length,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
