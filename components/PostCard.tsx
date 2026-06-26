import Link from 'next/link';
import { Post } from '@/lib/db';

const categoryColors: Record<string, string> = {
  beach: 'bg-sky-100 text-sky-700',
  mountains: 'bg-emerald-100 text-emerald-700',
  city: 'bg-violet-100 text-violet-700',
  'road trip': 'bg-orange-100 text-orange-700',
  adventure: 'bg-red-100 text-red-700',
  culture: 'bg-pink-100 text-pink-700',
  'food & drink': 'bg-amber-100 text-amber-700',
};

export default function PostCard({ post }: { post: Post }) {
  const colorClass = categoryColors[post.category.toLowerCase()] || 'bg-stone-100 text-stone-600';
  return (
    <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100">
      <div className="relative h-52 overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
          {post.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-stone-800 group-hover:text-amber-600 transition-colors leading-snug mb-2">
          {post.title}
        </h3>
        <p className="text-stone-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-stone-400">
          <span>{post.author}</span>
          <span>{post.readTime} min read · {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  );
}
