import { getEmailTemplate, sendMail } from '@/lib/mailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
        return NextResponse.error({ error: 'Missing required fields' });
    }

    try {
        const html = getEmailTemplate(name, email, message);

        await sendMail({
            from: email,
            to: process.env.SMTP_USER,
            subject: `New Contact Message from ${name}`,
            html,
        });

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err);
        return NextResponse.error({ error: 'Failed to send message' })
    }
}
