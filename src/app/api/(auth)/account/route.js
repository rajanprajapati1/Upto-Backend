import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TopPic from '@/models/TopPic';
import User from '@/models/User';
import { verify } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { uploadImageToImgBB } from '@/lib/imagis';

export async function GET(req) {
    try {
        await connectDB();

        const token = req.cookies.get('UPTO_BC_TOKEN')?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Authentication token missing' },
                { status: 401 }
            );
        }

        let decoded;
        try {
            decoded = verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json(
                { success: false, message: 'Invalid or expired token' },
                { status: 403 }
            );
        }

        const userId = decoded?.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json(
                { success: false, message: 'Invalid user ID' },
                { status: 400 }
            );
        }

        const user = await User.findById(userId).select('-password -__v');
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        const userCreatedPosts = await TopPic.find({ user: userId })
            .populate('user', '-password')
            .populate('likes', '-password')
            .populate('category', 'name slug')
            .populate({
                path: 'comments',
                populate: { path: 'user', select: '-password' }
            })
            .sort({ createdAt: -1 });

        const totalLikesReceived = userCreatedPosts.reduce((sum, post) => sum + post.likes.length, 0);
        const totalCommentsReceived = userCreatedPosts.reduce((sum, post) => sum + post.comments.length, 0);

        const postsUserLiked = await TopPic.find({
            likes: userId,
            user: { $ne: userId }
        })
            .populate('user', '-password')
            .populate('likes', '-password')
            .populate('category', 'name slug')
            .sort({ createdAt: -1 });

        const userPostsLikedByOthers = userCreatedPosts.filter(
            post => post.likes.some(likeUser => likeUser._id.toString() !== userId)
        );

        return NextResponse.json(
            {
                success: true,
                user,
                analytics: {
                    totalPosts: userCreatedPosts.length,
                    totalLikesReceived,
                    totalCommentsReceived,
                    totalLikedOthersPosts: postsUserLiked.length,
                    totalPostsLikedByOthers: userPostsLikedByOthers.length
                },
                userPosts: userCreatedPosts,
                postsUserLiked,
                userPostsLikedByOthers
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('GET /api/dashboard error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function PATCH(req) {
    try {
        await connectDB();

        const form = await req.formData();

        const userId = form.get('_id');
        if (!userId) {
            return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
        }

        const updateData = {};

        if (form.has('name')) updateData.name = form.get('name');
        if (form.has('bio')) updateData.bio = form.get('bio');
        if (form.has('password')) updateData.password = form.get('password');

        if (form.has('avatarFile')) {
            const file = form.get('avatarFile');
            const buffer = Buffer.from(await file.arrayBuffer());
            const base64 = buffer.toString('base64');
            const result = await uploadImageToImgBB(base64);

            if (!result.success) {
                throw new Error('Avatar upload failed');
            }

            updateData.avatar = result.data.url;
        } else if (form.has('avatar')) {
            updateData.avatar = form.get('avatar');
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
        }).select('-password');

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'User updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('User update error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Server error' },
            { status: 500 }
        );
    }
}