import { Card } from '@/components/ui/card';
import { getCategoryImage } from '@/lib/api';

interface CategoryCardProps {
  name: string;
  count: number;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function CategoryCard({
  name,
  count,
  icon,
  isSelected,
  onClick,
}: CategoryCardProps) {
  return (
    <Card
      className={`relative overflow-hidden cursor-pointer transition-all transform hover:scale-105 ${
        isSelected
          ? 'ring-2 ring-yellow-500'
          : 'hover:ring-1 hover:ring-yellow-300'
      }`}
      onClick={onClick}
    >
      <img
        src={getCategoryImage(name)}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h2 className="text-xl font-semibold text-white">
              {name}
            </h2>
            <p className="text-yellow-100">{count} posts</p>
          </div>
        </div>
      </div>
    </Card>
  );
}