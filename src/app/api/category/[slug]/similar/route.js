import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import TopPic from "@/models/TopPic";

export async function GET(req, { params }) {
    await connectDB();

    const { slug } = params;

    try {
        const category = await Category.findOne({ slug });
        if (!category) {
            return NextResponse.json(
                { success: false, message: "Category not found" },
                { status: 404 }
            );
        }
        const topics = await TopPic.find({ category: category?._id }).populate({ path: 'user', model: 'UserdB', select: 'name avatar' })
            .populate({ path: 'likes', model: 'UserdB', select: 'name avatar' })
            .populate('category', 'name slug')
            .populate({
                path: 'comments',
                populate: { path: 'user', select: 'name avatar' }
            })
            .sort({ createdAt: -1 });
        console.log(category, "category", topics)
        return NextResponse.json({
            success: true,
            data: topics,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
