import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost, toSlug, readTime } from '@/lib/db';

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, excerpt, content, category, coverImage, author } = body;
  if (!title || !content || !category) {
    return NextResponse.json({ error: 'Title, content, and category are required.' }, { status: 400 });
  }
  const post = await createPost({
    title,
    excerpt: excerpt || '',
    content,
    category,
    coverImage: coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80',
    author: author || 'Caroline',
    slug: toSlug(title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    readTime: readTime(content),
  });
  return NextResponse.json(post, { status: 201 });
}
