import { Post } from '@/types/blog';

export function searchPosts(posts: Post[], searchTerm: string): Post[] {
  if (!searchTerm) return posts;
  
  const lowercaseSearch = searchTerm.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseSearch) ||
    post.body.toLowerCase().includes(lowercaseSearch)
  );
}