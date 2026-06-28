'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-[family-name:var(--font-display)] text-xl font-bold text-stone-800 tracking-tight">
          ✈ Miles & Memories
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <Link href="/blog" className="hover:text-amber-600 transition-colors">All Posts</Link>
          <Link href="/category/beach" className="hover:text-amber-600 transition-colors">Beach</Link>
          <Link href="/category/mountains" className="hover:text-amber-600 transition-colors">Mountains</Link>
          <Link href="/category/city" className="hover:text-amber-600 transition-colors">City</Link>
          <Link href="/admin" className="ml-2 px-4 py-1.5 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors">
            Write Post
          </Link>
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-stone-700"></span>
            <span className="block w-6 h-0.5 bg-stone-700"></span>
            <span className="block w-6 h-0.5 bg-stone-700"></span>
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 py-4 space-y-3 text-sm font-medium">
          <Link href="/" className="block text-stone-700" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/blog" className="block text-stone-700" onClick={() => setOpen(false)}>All Posts</Link>
          <Link href="/admin" className="block text-amber-600 font-semibold" onClick={() => setOpen(false)}>Write Post</Link>
        </div>
      )}
    </header>
  );
}
