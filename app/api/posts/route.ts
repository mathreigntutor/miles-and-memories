import { NextRequest, NextResponse } from 'next/server';
import { connectDB, PostModel, toSlug, readTime } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  await connectDB();
  const posts = await PostModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(posts.map((p: any) => ({ ...p, id: p._id.toString() })));
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { title, excerpt, content, category, coverImage, author } = body;
  if (!title || !content || !category) {
    return NextResponse.json({ error: 'Title, content, and category are required.' }, { status: 400 });
  }
  const post = await PostModel.create({
    title,
    excerpt,
    content,
    category,
    coverImage: coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80',
    author: author || 'Caroline',
    slug: toSlug(title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    readTime: readTime(content),
  });
  return NextResponse.json({ ...post.toObject(), id: post._id.toString() }, { status: 201 });
}
