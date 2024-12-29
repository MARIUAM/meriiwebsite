'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import CategoryCard from '@/components/CategoryCard';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';
import CategoryComments from '@/components/comments/CategoryComments';
import { fetchPostsByCategory, getCategoryCount } from '@/lib/api';
import { searchPosts } from '@/lib/utils/search';
import { CATEGORIES } from '@/lib/constants';
import type { Post } from '@/types/blog';

export default function Categories() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || CATEGORIES[0].name
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const { toast } = useToast();

  useEffect(() => {
    const loadCategoryCounts = async () => {
      const counts: Record<string, number> = {};
      for (const category of CATEGORIES) {
        counts[category.name] = await getCategoryCount(category.name);
      }
      setCategoryCounts(counts);
    };
    loadCategoryCounts();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const categoryPosts = await fetchPostsByCategory(selectedCategory);
        setPosts(categoryPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        toast({
          title: 'Error',
          description: 'Failed to load posts. Please try again.',
          variant: 'destructive',
        });
      }
      setLoading(false);
    };
    loadPosts();
  }, [selectedCategory, toast]);

  const filteredPosts = searchPosts(posts, searchTerm);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Categories
        </h1>
        <div className="w-full md:w-72">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search posts..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            icon={category.icon}
            count={categoryCounts[category.name] || 0}
            isSelected={selectedCategory === category.name}
            onClick={() => setSelectedCategory(category.name)}
          />
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"
            />
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No posts found in this category.
          </p>
        </div>
      )}

      {selectedCategory && <CategoryComments categoryName={selectedCategory} />}
    </div>
  );
}