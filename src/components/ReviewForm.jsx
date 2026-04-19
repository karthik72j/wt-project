import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useAuth } from '../contexts/AuthContext';
import StarRating from './StarRating';
import { FaPaperPlane } from 'react-icons/fa';

const ReviewForm = ({ bookId, onReviewAdded }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim() || rating === 0) {
      enqueueSnackbar('Please provide both a comment and rating', { variant: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5556/books/${bookId}/review`,
        { comment: comment.trim(), rating },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      enqueueSnackbar('Review added successfully!', { variant: 'success' });
      setComment('');
      setRating(0);

      if (onReviewAdded) {
        onReviewAdded(response.data);
      }
    } catch (error) {
      enqueueSnackbar('Failed to add review', { variant: 'error' });
      console.error('Review error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6 mb-6">
      <h3 className="text-xl font-semibold text-library-text mb-4">Write a Review</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-library-text mb-2">
            Your Rating
          </label>
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            interactive={true}
            size="text-xl"
          />
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-library-text mb-2">
            Your Review
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="input-field resize-none"
            placeholder="Share your thoughts about this book..."
            rows="4"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane className="h-4 w-4" />
            <span>{loading ? 'Submitting...' : 'Submit Review'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;