import { CATEGORIES } from './constants';
import type { Post } from '@/types/blog';

const POSTS_PER_PAGE = 9;

export async function fetchPosts(page = 1): Promise<Post[]> {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${POSTS_PER_PAGE}`
    );
    
    if (!res.ok) throw new Error('Failed to fetch posts');
    
    const posts = await res.json();
    return posts.map((post: any) => ({
      ...post,
      category: getCategoryForPost(post.id)
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function fetchPostsByCategory(category: string): Promise<Post[]> {
  try {
    const posts = await fetchPosts(1);
    return posts.filter((post) => getCategoryForPost(post.id) === category);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

export function getCategoryForPost(postId: number): string {
  return CATEGORIES[postId % CATEGORIES.length].name;
}

export function getCategoryImage(categoryName: string): string {
  const category = CATEGORIES.find(cat => cat.name === categoryName);
  return category?.image || `https://source.unsplash.com/random/800x600?${categoryName.toLowerCase()}`;
}

export async function getCategoryCount(category: string): Promise<number> {
  try {
    const allPosts = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());
    return allPosts.filter((post: any) => getCategoryForPost(post.id) === category).length;
  } catch (error) {
    console.error('Error getting category count:', error);
    return 0;
  }
}