'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export default function CommentSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((res) => res.json())
      .then(setComments);
  }, [postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      postId,
      name: 'Anonymous',
      email: 'anonymous@example.com',
      body: newComment,
    };

    fetch('https://jsonplaceholder.typicode.com/comments', {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setComments([...comments, { ...comment, id: data.id }]);
        setNewComment('');
        toast({
          title: 'Success',
          description: 'Comment added successfully!',
        });
      });
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Comments
      </h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="mb-4"
        />
        <Button type="submit">Add Comment</Button>
      </form>
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
          >
            <div className="flex items-center mb-2">
              <div className="font-medium text-gray-900 dark:text-white">
                {comment.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                ({comment.email})
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}