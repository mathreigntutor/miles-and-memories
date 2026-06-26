import { getAllPosts, deletePost } from '@/lib/db';
import Link from 'next/link';
import AdminDeleteButton from './AdminDeleteButton';

export default function AdminPage() {
  const posts = getAllPosts();
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-stone-800">Manage Posts</h1>
          <p className="text-stone-500 mt-1">{posts.length} {posts.length === 1 ? 'post' : 'posts'} total</p>
        </div>
        <Link href="/admin/new" className="px-5 py-2.5 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition-colors">
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <p className="text-5xl mb-4">✍️</p>
          <p>No posts yet. <Link href="/admin/new" className="text-amber-600 font-semibold">Write your first story, Caroline!</Link></p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-xl border border-stone-100 p-4 flex items-center gap-4">
              <img src={post.coverImage} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-stone-800 truncate">{post.title}</p>
                <p className="text-sm text-stone-400">{post.category} · {new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/blog/${post.slug}`} className="text-xs px-3 py-1.5 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
                  View
                </Link>
                <Link href={`/admin/edit/${post.id}`} className="text-xs px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors">
                  Edit
                </Link>
                <AdminDeleteButton postId={post.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
