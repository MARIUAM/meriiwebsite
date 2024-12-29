'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PostGrid from '@/components/PostGrid';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { fetchPosts } from '@/lib/api';
import { searchPosts } from '@/lib/utils/search';
import type { Post } from '@/types/blog';

export default function Blog() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const newPosts = await fetchPosts(page);
        setPosts(prev => page === 1 ? newPosts : [...prev, ...newPosts]);
        setHasMore(newPosts.length === 9);
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
      setLoading(false);
    }
    loadPosts();
  }, [page]);

  const filteredPosts = searchPosts(posts, searchTerm);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Blog Posts
        </h1>
        <div className="w-full md:w-72">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search posts..."
          />
        </div>
      </div>

      <PostGrid posts={filteredPosts} loading={loading && page === 1} />

      {!loading && filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No posts found matching your search.
          </p>
        </div>
      )}

      {hasMore && !loading && filteredPosts.length > 0 && (
        <div className="mt-12 text-center">
          <Button
            onClick={() => setPage(prev => prev + 1)}
            variant="outline"
            className="hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
          >
            Load More Posts
          </Button>
        </div>
      )}
    </div>
  );
}