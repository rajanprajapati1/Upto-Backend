import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TopPic from "@/models/TopPic";
import mongoose from "mongoose";

export async function POST(req) {
  await connectDB();

  const { id } = await req.json();

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid or missing content_id" },
      { status: 400 }
    );
  }

  try {
    const post = await TopPic.findById(id)
      .populate({ path: "user", model: "UserdB", select: "name avatar" })
      .populate({ path: "likes", model: "UserdB", select: "name avatar" })
      .populate("category", "name slug")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "UserdB",
          select: "name avatar"
        }
      });

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    let relatedTopics = [];

    if (post.category || (Array.isArray(post.tags) && post.tags.length > 0)) {
      const relatedQuery = [];

      if (post.category?._id) {
        relatedQuery.push({ category: post.category._id });
      }

      if (Array.isArray(post.tags) && post.tags.length > 0) {
        relatedQuery.push({ tags: { $in: post.tags } });
      }

      relatedTopics = await TopPic.find({
        _id: { $ne: post._id },
        $or: relatedQuery
      })
        .limit(5)
        .select("title imageUrl")
        .lean();
    }

    return NextResponse.json({
      success: true,
      data: post,
      related: relatedTopics
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
