import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/types/blog';

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="relative h-[500px] rounded-xl overflow-hidden group">
      <img
        src={`https://images.unsplash.com/photo-1494178270175-e96de2971df9?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D${post.category}`}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm mb-4 inline-block">
          {post.category}
        </span>
        <h2 className="text-3xl font-bold text-white mb-4">{post.title}</h2>
        <p className="text-gray-200 mb-6 line-clamp-2">{post.body}</p>
        <Link
          href={`/blog/${post.id}`}
          className="inline-flex items-center text-yellow-400 hover:text-yellow-300"
        >
          Read More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}