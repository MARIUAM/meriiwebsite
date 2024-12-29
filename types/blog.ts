export interface Post {
  id: number;
  title: string;
  body: string;
  category: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
  image: string;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  likes: number;
  liked: boolean;
  createdAt: string;
  parentId?: number;
}