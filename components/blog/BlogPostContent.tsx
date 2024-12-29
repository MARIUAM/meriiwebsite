'use client';

import { useState, useEffect } from 'react';
import CommentSection from '@/components/CommentSection';
import type { Post } from '@/types/blog';

interface BlogPostContentProps {
  id: string;
}

export default function BlogPostContent({ id }: BlogPostContentProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost({
          ...data,
          category: ['Technology', 'Travel', 'Food', 'Lifestyle'][
            Math.floor(Math.random() * 4)
          ],
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading || !post) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="prose dark:prose-invert lg:prose-xl mx-auto">
        <img
          src={`https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D${post.category.toLowerCase()}`}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
        <div className="mb-6">
          <span className="inline-block bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full px-3 py-1 text-sm font-medium">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <div className="text-gray-600 dark:text-gray-300 mb-8">{post.body}</div>
      </article>
      <CommentSection postId={parseInt(id)} />
    </div>
  );
}