import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: 'Logged out successfully',
    });

    response.cookies.set('UPTO_BC_TOKEN', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 0,
        path: '/',
    });

    return response;
}
