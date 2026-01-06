import { useState } from "react";

export default function RatingStars({ rating = 0, onRatingChange, readOnly = false }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${
            (hoverRating || rating) >= star ? "filled" : ""
          }`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readOnly && setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
