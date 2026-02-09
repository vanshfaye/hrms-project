import React from "react";
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

export default RatingStars;
