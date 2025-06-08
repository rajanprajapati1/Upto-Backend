import { NextResponse } from "next/server";
import { uploadImageToImgBB } from "@/lib/imagis"; // adjust path as needed

export async function POST(req) {
    try {
        const formData = await req.formData();
        const image = formData.get("image");

        if (!image) {
            return NextResponse.json({ success: false, message: "No image provided" }, { status: 400 });
        }

        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString("base64");

        const result = await uploadImageToImgBB(base64Image);

        return NextResponse.json({ success: true, url: result.data.url ,result });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
