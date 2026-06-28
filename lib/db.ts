import mongoose, { Schema, model, models } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error('Please define MONGODB_URI in .env.local');

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then(m => m);
  }
  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  readTime: number;
}

const PostSchema = new Schema({
  title: String,
  slug: { type: String, unique: true },
  excerpt: String,
  content: String,
  category: String,
  coverImage: String,
  author: String,
  createdAt: String,
  updatedAt: String,
  readTime: Number,
});

export const PostModel = models.Post || model('Post', PostSchema);

export const CATEGORIES = ['Beach', 'Mountains', 'City', 'Road Trip', 'Adventure', 'Culture', 'Food & Drink'];

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function readTime(content: string): number {
  return Math.max(1, Math.round(content.split(' ').length / 200));
}
