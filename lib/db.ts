import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
const client = new MongoClient(MONGODB_URI);
let connected = false;

async function getDb() {
  if (!connected) {
    await client.connect();
    connected = true;
  }
  return client.db('milesandmemories');
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

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function readTime(content: string): number {
  return Math.max(1, Math.round(content.split(' ').length / 200));
}

export async function getAllPosts(): Promise<Post[]> {
  const db = await getDb();
  const posts = await db.collection('posts').find().sort({ createdAt: -1 }).toArray();
  return posts.map((p: any) => ({ ...p, id: p._id.toString(), _id: undefined }));
}

export async function getPostById(id: string): Promise<Post | null> {
  const db = await getDb();
  const post = await db.collection('posts').findOne({ _id: new ObjectId(id) }) as any;
  if (!post) return null;
  return { ...post, id: post._id.toString(), _id: undefined };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const db = await getDb();
  const post = await db.collection('posts').findOne({ slug }) as any;
  if (!post) return null;
  return { ...post, id: post._id.toString(), _id: undefined };
}

export async function createPost(data: Omit<Post, 'id'>): Promise<Post> {
  const db = await getDb();
  const result = await db.collection('posts').insertOne(data);
  return { ...data, id: result.insertedId.toString() };
}

export async function updatePost(id: string, data: Partial<Post>): Promise<Post | null> {
  const db = await getDb();
  const result = await db.collection('posts').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    { returnDocument: 'after' }
  ) as any;
  if (!result) return null;
  return { ...result, id: result._id.toString(), _id: undefined };
}

export async function deletePost(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection('posts').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

export const CATEGORIES = ['Beach', 'Mountains', 'City', 'Road Trip', 'Adventure', 'Culture', 'Food & Drink'];
