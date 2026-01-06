import { useState } from "react";
import RatingStars from "../../ui/RatingStars";

export default function RatingForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    rating: initialData.rating || 0,
    feedback: initialData.feedback || "",
    title: initialData.title || "",
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="rating-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Rating</label>
        <RatingStars
          rating={formData.rating}
          onRatingChange={handleRatingChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="feedback">Feedback</label>
        <textarea
          id="feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          rows="4"
          placeholder="Share your feedback..."
        />
      </div>
      <button type="submit" className="submit-button">
        Submit Rating
      </button>
    </form>
  );
}
