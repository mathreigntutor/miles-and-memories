import { getAllPosts } from '@/lib/db';
import PostCard from '@/components/PostCard';

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-stone-800 mb-2">All Stories</h1>
      <p className="text-stone-500 mb-10">Every adventure, tip, and tale — all in one place.</p>
      {posts.length === 0 ? (
        <p className="text-stone-400 text-center py-20">No posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  );
}
