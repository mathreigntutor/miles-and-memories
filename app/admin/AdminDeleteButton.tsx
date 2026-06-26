'use client';
import { useRouter } from 'next/navigation';

export default function AdminDeleteButton({ postId }: { postId: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
    >
      Delete
    </button>
  );
}
