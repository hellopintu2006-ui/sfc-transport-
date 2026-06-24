import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../utils/cn';

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
  starSize?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  interactive = false,
  onChange,
  className,
  starSize = 20,
}) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const displayRating = hoverRating !== null ? hoverRating : rating;

  const handleStarClick = (idx: number) => {
    if (interactive && onChange) {
      onChange(idx);
    }
  };

  const handleStarMouseEnter = (idx: number) => {
    if (interactive) {
      setHoverRating(idx);
    }
  };

  const handleStarMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  return (
    <div className={cn("flex gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const starIndex = i + 1;
        const isFilled = starIndex <= displayRating;
        return (
          <button
            key={starIndex}
            type="button"
            disabled={!interactive}
            onClick={() => handleStarClick(starIndex)}
            onMouseEnter={() => handleStarMouseEnter(starIndex)}
            onMouseLeave={handleStarMouseLeave}
            className={cn(
              "transition-colors duration-150 focus:outline-none",
              interactive ? "cursor-pointer hover:scale-110 transform active:scale-95" : "cursor-default"
            )}
          >
            <Star
              size={starSize}
              className={cn(
                isFilled ? "fill-accent text-accent" : "text-slate-300 fill-transparent"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
