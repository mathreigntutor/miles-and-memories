'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PostForm from '@/components/PostForm';
import { Post } from '@/lib/db';

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`).then(r => r.json()).then(setPost);
  }, [id]);

  if (!post) return <div className="text-center py-20 text-stone-400">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-stone-800 mb-8">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
