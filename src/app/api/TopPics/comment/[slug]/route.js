import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Comment from "@/models/Comment";
import TopPic from "@/models/TopPic";

export async function POST(req, { params }) {
    await connectDB();

    try {
        const { slug: postId } = params;
        const { userId, text } = await req.json();
        console.log("🚀 ~ POST ~ postId:", postId)

        if (!userId || !postId || !text) {
            return NextResponse.json(
                { success: false, message: "Missing required fields." },
                { status: 400 }
            );
        }

        const postExists = await TopPic.findById(postId);
        if (!postExists) {
            return NextResponse.json(
                { success: false, message: "Post not found." },
                { status: 404 }
            );
        }

        const newComment = await Comment.create({
            user: userId,
            post: postId,
            text,
        });

        await TopPic.findByIdAndUpdate(postId, {
            $push: { comments: newComment?._id }
        });

        return NextResponse.json({
            success: true,
            message: "Comment added successfully.",
            data: newComment,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
