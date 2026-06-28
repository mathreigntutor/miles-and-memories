'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['Beach', 'Mountains', 'City', 'Road Trip', 'Adventure', 'Culture', 'Food & Drink'];

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  author: string;
}

export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    category: post?.category || CATEGORIES[0],
    coverImage: post?.coverImage || '',
    author: post?.author || 'Caroline',
  });

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (post) {
        await fetch(`/api/posts/${post.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else {
        await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      router.push('/admin');
      router.refresh();
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1">Title *</label>
        <input type="text" value={form.title} onChange={e => update('title',
cat > ~/Downloads/travel-blog/components/PostForm.tsx << 'EOF'
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['Beach', 'Mountains', 'City', 'Road Trip', 'Adventure', 'Culture', 'Food & Drink'];

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  author: string;
}

export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    category: post?.category || CATEGORIES[0],
    coverImage: post?.coverImage || '',
    author: post?.author || 'Caroline',
  });

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (post) {
        await fetch(`/api/posts/${post.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else {
        await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      router.push('/admin');
      router.refresh();
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1">Title *</label>
        <input type="text" value={form.title} onChange={e => update('title', e.target.value)} required
          placeholder="A Night Under the Stars in Patagonia"
          className="w-full border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800 placeholder:text-stone-300" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1">Author</label>
          <input type="text" value={form.author} onChange={e => update('author', e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1">Category *</label>
          <select value={form.category} onChange={e => update('category', e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800 bg-white">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1">Cover Image URL</label>
        <input type="url" value={form.coverImage} onChange={e => update('coverImage', e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800 placeholder:text-stone-300" />
        <p className="text-xs text-stone-400 mt-1">Tip: Use free images from <a href="https://unsplash.com" target="_blank" className="text-amber-600 underline">unsplash.com</a></p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1">Excerpt</label>
        <textarea value={form.excerpt} onChange={e => update('excerpt', e.target.value)} rows={2}
          placeholder="A short summary shown on the blog listing page..."
          className="w-full border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800 placeholder:text-stone-300 resize-none" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1">Content *</label>
        <textarea value={form.content} onChange={e => update('content', e.target.value)} required rows={14}
          placeholder="Write your travel story here... Separate paragraphs with a blank line."
          className="w-full border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800 placeholder:text-stone-300 resize-y font-mono text-sm" />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={loading}
          className="px-6 py-2.5 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50">
          {loading ? 'Saving...' : post ? 'Save Changes' : 'Publish Post'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-6 py-2.5 text-stone-600 hover:text-stone-800 font-medium transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
