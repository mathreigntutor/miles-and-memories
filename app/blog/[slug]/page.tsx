import { Post } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts`, { cache: 'no-store' });
    const posts: Post[] = await res.json();
    return posts.find(p => p.slug === slug) || null;
  } catch { return null; }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-sm text-amber-600 hover:underline mb-6 inline-block">← All Stories</Link>
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">{post.category}</span>
      </div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-stone-900 leading-tight mb-4">{post.title}</h1>
      <div className="flex items-center gap-3 text-sm text-stone-400 mb-8">
        <span className="font-medium text-stone-600">{post.author}</span>
        <span>·</span>
        <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <span>·</span>
        <span>{post.readTime} min read</span>
      </div>
      <div className="rounded-2xl overflow-hidden mb-10 h-80">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>
      <div className="prose prose-stone max-w-none">
        {post.content.split('\n\n').map((para, i) => (
          <p key={i} className="text-stone-700 leading-relaxed mb-5 text-lg">{para}</p>
        ))}
      </div>
      <div className="mt-12 pt-8 border-t border-stone-100 flex gap-3">
        <Link href={`/admin/edit/${post.id}`} className="px-4 py-2 text-sm bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors">Edit Post</Link>
      </div>
    </article>
  );
}
