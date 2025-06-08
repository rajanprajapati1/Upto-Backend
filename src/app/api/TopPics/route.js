import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TopPic from '@/models/TopPic';
import User from '@/models/User';
import Category from '@/models/Category';
import Comment from '@/models/Comment';
import { uploadImageToImgBB } from '@/lib/imagis';

export async function GET() {
  try {
    await connectDB();

    const toppics = await TopPic.find({})
      .populate({ path: 'user', model: 'UserdB', select: 'name avatar' })
      .populate({ path: 'likes', model: 'UserdB', select: 'name avatar' })
      .populate('category', 'name slug')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'UserdB',
          select: 'name avatar'
        }
      })
      .sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: toppics });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const image = formData.get("image");

    const title = formData.get("title");
    const description = formData.get("description");
    const tags = formData.get("tags")?.split(',').map(tag => tag.trim()) || [];
    const externalLink = formData.get("externalLink");
    const reference = formData.get("reference");
    const categoryId = formData.get("categoryId");
    const userId = formData.get("userId");

    if (!image || !title) {
      return NextResponse.json({ success: false, message: "Title and image are required" }, { status: 400 });
    }

    const arrayBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const result = await uploadImageToImgBB(base64Image);
    if (!result.success) {
      throw new Error("Image upload failed");
    }

    const newPost = await TopPic.create({
      title,
      description,
      tags,
      imageUrl: result.data.url,
      externalLink,
      reference,
      user: userId,
      category: categoryId || null,
    })

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error("Post creation error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    }, { status: 500 });
  }
}