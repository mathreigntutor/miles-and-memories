import { getPostById } from '@/lib/db';
import { notFound } from 'next/navigation';
import PostForm from '@/components/PostForm';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-stone-800 mb-8">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
