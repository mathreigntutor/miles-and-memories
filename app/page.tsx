import { getAllPosts } from '@/lib/db';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export default function Home() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1, 7);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        {featured && (
          <>
            <img
              src={featured.coverImage}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 max-w-6xl mx-auto px-4 pb-12 w-full">
              <span className="inline-block bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                Featured Story
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl mb-3">
                {featured.title}
              </h1>
              <p className="text-stone-200 max-w-xl text-base mb-5">{featured.excerpt}</p>
              <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-2 bg-white text-stone-800 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-amber-400 hover:text-white transition-colors">
                Read Story →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Latest Posts */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-stone-800">Latest Stories</h2>
          <Link href="/blog" className="text-sm text-amber-600 font-semibold hover:underline">View all →</Link>
        </div>
        {rest.length === 0 && posts.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <p className="text-5xl mb-4">✈️</p>
            <p className="text-lg">No posts yet. <Link href="/admin" className="text-amber-600 font-semibold">Write your first story, Caroline!</Link></p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(post => <PostCard key={post.id} post={post} />)}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="bg-white border-t border-stone-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-stone-800 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Beach', emoji: '🏖️', color: 'bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200' },
              { name: 'Mountains', emoji: '🏔️', color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200' },
              { name: 'City', emoji: '🌆', color: 'bg-violet-50 hover:bg-violet-100 text-violet-700 border-violet-200' },
              { name: 'Road Trip', emoji: '🚗', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200' },
              { name: 'Adventure', emoji: '🧗', color: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200' },
              { name: 'Culture', emoji: '🏛️', color: 'bg-pink-50 hover:bg-pink-100 text-pink-700 border-pink-200' },
              { name: 'Food & Drink', emoji: '🍜', color: 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200' },
              { name: 'All Posts', emoji: '🗺️', color: 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200' },
            ].map(cat => (
              <Link
                key={cat.name}
                href={cat.name === 'All Posts' ? '/blog' : `/category/${cat.name.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl border transition-colors font-medium text-sm ${cat.color}`}
              >
                <span className="text-xl">{cat.emoji}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Caroline */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 w-24 h-24 rounded-full bg-amber-200 flex items-center justify-center text-4xl">
            🌏
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">About the Author</p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-stone-800 mb-3">Hi, I'm Caroline 👋</h2>
            <p className="text-stone-600 leading-relaxed">
              Born and raised in Mettur Dam, Tamil Nadu, India — now living in the USA since 2003. 
              Mom of two, working full time, and always planning the next trip. 
              I travel on a budget, take local buses and trains, stay in Airbnbs, 
              and squeeze every hidden gem out of every destination I visit. 
              Travel is where I forget the routine and find myself again.
            </p>
            <p className="mt-3 text-sm text-amber-700 font-medium italic">"The world is where I breathe."</p>
          </div>
        </div>
      </section>
    </div>
  );
}
