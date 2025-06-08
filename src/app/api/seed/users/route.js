import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();

    const users = [
      //   {
      //     name: 'Rajan Prajapati',
      //     email: 'rajan@upyo.com',
      //     avatar: 'https://i.pravatar.cc/150?u=rajan',
      //     bio: 'Founder of Upyo, content curator & creative mind.'
      //   },
      //   {
      //     name: 'Aisha Khan',
      //     email: 'aisha@upyo.com',
      //     avatar: 'https://i.pravatar.cc/150?u=aisha',
      //     bio: 'Lifestyle blogger & design lover.'
      //   },
      //   {
      //     name: 'Zayn Patel',
      //     email: 'zayn@upyo.com',
      //     avatar: 'https://i.pravatar.cc/150?u=zayn',
      //     bio: 'Frontend dev & trend explorer.'
      //   },
      //   {
      //     name: 'Meera Joshi',
      //     email: 'meera@upyo.com',
      //     avatar: 'https://i.pravatar.cc/150?u=meera',
      //     bio: 'Photographer & fashion enthusiast.'
      //   },
      //   {
      //     name: 'Aryan Singh',
      //     email: 'aryan@upyo.com',
      //     avatar: 'https://i.pravatar.cc/150?u=aryan',
      //     bio: 'Writes about tech and wellness.'
      //   },
    ];

    const inserted = await User.insertMany(users, { ordered: false });

    return NextResponse.json({ success: true, insertedCount: inserted.length, users: inserted });
  } catch (error) {
    console.error("Insertion error:", error);
    return NextResponse.json({ success: false, message: 'Failed to seed users', error: error.message }, { status: 500 });
  }
}
