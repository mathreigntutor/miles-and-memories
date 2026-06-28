import PostForm from '@/components/PostForm';

export default function NewPostPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-stone-800 mb-8">Write a New Story ✍️</h1>
      <PostForm />
    </div>
  );
}
