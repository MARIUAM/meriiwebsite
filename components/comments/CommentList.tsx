'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CommentInput from './CommentInput';
import type { Comment } from '@/types/blog';

interface CommentListProps {
  comments: Comment[];
  onAddComment: (comment: Partial<Comment>, parentId?: number) => void;
  onLike: (commentId: number) => void;
}

export default function CommentList({ comments, onAddComment, onLike }: CommentListProps) {
  const [showReplyFor, setShowReplyFor] = useState<number | null>(null);

  const handleReply = (content: string, parentId: number) => {
    onAddComment({ content }, parentId);
    setShowReplyFor(null);
  };

  const renderComment = (comment: Comment, level = 0) => {
    const replies = comments.filter(c => c.parentId === comment.id);
    const hasReplies = replies.length > 0;

    return (
      <div key={comment.id} className={`${level > 0 ? 'ml-12' : ''} mb-4`}>
        <div className="flex gap-3">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author}`}
            alt={comment.author}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
              <div className="font-semibold text-sm">{comment.author}</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</div>
            </div>
            
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
              <button 
                onClick={() => onLike(comment.id)}
                className={`hover:text-yellow-500 flex items-center gap-1 ${
                  comment.liked ? 'text-yellow-500' : ''
                }`}
              >
                <Heart size={14} fill={comment.liked ? "currentColor" : "none"} /> 
                {comment.likes > 0 && comment.likes}
              </button>
              <button 
                onClick={() => setShowReplyFor(showReplyFor === comment.id ? null : comment.id)}
                className="hover:text-yellow-500 flex items-center gap-1"
              >
                <MessageCircle size={14} /> Reply
              </button>
              <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
            </div>

            {showReplyFor === comment.id && (
              <div className="mt-2">
                <CommentInput
                  onSubmit={(content) => handleReply(content, comment.id)}
                  placeholder={`Reply to ${comment.author}...`}
                  isReply
                />
              </div>
            )}
          </div>
        </div>

        {hasReplies && (
          <div className="mt-2">
            {replies.map(reply => renderComment(reply, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {comments.filter(c => !c.parentId).map(comment => renderComment(comment))}
    </div>
  );
}