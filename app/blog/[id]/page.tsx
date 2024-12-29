import { Suspense } from 'react';
import BlogPostContent from '@/components/blog/BlogPostContent';
import BlogPostSkeleton from '@/components/blog/BlogPostSkeleton';

// This needs to be a server component since it handles static generation
export default function BlogPost({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent id={params.id} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  // Generate only the first 20 posts for static generation
  return Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}