'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';

interface CommentInputProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  isReply?: boolean;
}

export default function CommentInput({ onSubmit, placeholder, isReply }: CommentInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="User" />
      </Avatar>
      <div className="flex-1">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder || "Write a comment..."}
          className="min-h-[60px] mb-2"
        />
        <Button 
          onClick={handleSubmit}
          size="sm"
          className={isReply ? "bg-gray-200 hover:bg-gray-300 text-gray-700" : ""}
        >
          {isReply ? 'Reply' : 'Comment'}
        </Button>
      </div>
    </div>
  );
}