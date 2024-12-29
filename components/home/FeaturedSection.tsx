import FeaturedPost from '@/components/FeaturedPost';
import type { Post } from '@/types/blog';

export default function FeaturedSection({ post }: { post: Post }) {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Featured Post
        </h2>
        <FeaturedPost post={post} />
      </div>
    </section>
  );
}