import { getAllPosts, CATEGORIES } from '@/lib/db';
import PostCard from '@/components/PostCard';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name).replace(/-/g, ' ');
  const matchedCategory = CATEGORIES.find(c => c.toLowerCase() === decodedName.toLowerCase());
  if (!matchedCategory) notFound();

  const posts = getAllPosts().filter(p => p.category.toLowerCase() === matchedCategory.toLowerCase());

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-stone-800 mb-2">{matchedCategory}</h1>
      <p className="text-stone-500 mb-10">{posts.length} {posts.length === 1 ? 'story' : 'stories'} in this category.</p>
      {posts.length === 0 ? (
        <p className="text-stone-400 text-center py-20">No posts in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  );
}
