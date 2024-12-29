'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import type { Comment } from '@/types/blog';

interface CategoryCommentsProps {
  categoryName: string;
}

export default function CategoryComments({ categoryName }: CategoryCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const { toast } = useToast();

  const handleAddComment = (newComment: Partial<Comment>, parentId?: number) => {
    const comment: Comment = {
      id: Date.now(),
      author: 'Anonymous User',
      content: newComment.content!,
      likes: 0,
      liked: false,
      createdAt: new Date().toISOString(),
      parentId,
    };

    setComments(prev => [...prev, comment]);
    toast({
      title: 'Success',
      description: parentId ? 'Reply added successfully!' : 'Comment added successfully!',
    });
  };

  const handleLike = (commentId: number) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
              liked: !comment.liked,
            }
          : comment
      )
    );
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-6">Comments on {categoryName}</h3>
      
      <div className="mb-8">
        <CommentInput onSubmit={(content) => handleAddComment({ content })} />
      </div>

      <CommentList
        comments={comments}
        onAddComment={handleAddComment}
        onLike={handleLike}
      />

      {comments.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
}