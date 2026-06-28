export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="font-[family-name:var(--font-display)] text-white text-lg font-bold">✈ Miles & Memories</p>
          <p className="text-sm mt-1 text-stone-400">The world is where I breathe.</p>
        </div>
        <p className="text-sm text-stone-500">© {new Date().getFullYear()} Wanderlust Chronicles. Built with Next.js.</p>
      </div>
    </footer>
  );
}
