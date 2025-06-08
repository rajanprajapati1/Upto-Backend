import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET() {
    await connectDB();

    try {
        const categories = await Category.find({});
        return NextResponse.json({
            success: true,
            data: categories,
            count: categories.length
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    await connectDB();

    try {
        const body = await req.json();
        const { name, slug, description } = body;

        if (!name || !slug) {
            return NextResponse.json(
                { success: false, message: "Name and slug are required" },
                { status: 400 }
            );
        }

        const newCategory = await Category.create({
            name,
            slug,
            description
        });

        return NextResponse.json({
            success: true,
            message: "Category created successfully",
            data: newCategory
        });

    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, message: "Slug or name already exists" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}