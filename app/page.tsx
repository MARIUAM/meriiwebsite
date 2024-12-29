import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedSection from '@/components/home/FeaturedSection';
import CategorySection from '@/components/home/CategorySection';
import PostGrid from '@/components/PostGrid';
import { fetchPosts } from '@/lib/api';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const posts = await fetchPosts(1);
  const featuredPost = posts[0];

  return (
    <div className="min-h-screen">
      <HeroSection />

      {featuredPost && (
        <Suspense fallback={<div>Loading...</div>}>
          <FeaturedSection post={featuredPost} />
        </Suspense>
      )}

      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Latest Posts
            </h2>
            <Link
              href="/blog"
              className="text-yellow-500 hover:text-yellow-600 inline-flex items-center"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <PostGrid posts={posts.slice(1, 7)} />
        </div>
      </section>

      <CategorySection />
    </div>
  );
}