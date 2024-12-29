import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { getCategoryImage } from '@/lib/api';

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  category: string;
}

export default function PostCard({ id, title, body, category }: PostCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48">
        <img
          src={getCategoryImage(category)}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
          {body.slice(0, 100)}...
        </p>
        <Link
          href={`/blog/${id}`}
          className="text-yellow-500 hover:text-yellow-600 font-medium inline-flex items-center"
        >
          Read more
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </Card>
  );
}