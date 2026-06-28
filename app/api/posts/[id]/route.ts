import { NextRequest, NextResponse } from 'next/server';
import { connectDB, PostModel, toSlug, readTime } from '@/lib/db';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const post = await PostModel.findById(id).lean() as any;
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ...post, id: post._id.toString() });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  if (body.title) body.slug = toSlug(body.title);
  if (body.content) body.readTime = readTime(body.content);
  body.updatedAt = new Date().toISOString();
  const post = await PostModel.findByIdAndUpdate(id, body, { new: true }).lean() as any;
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ...post, id: post._id.toString() });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const post = await PostModel.findByIdAndDelete(id);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
