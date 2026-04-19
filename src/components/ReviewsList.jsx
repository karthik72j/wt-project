import React from 'react';
import StarRating from './StarRating';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';

const ReviewsList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8 text-library-secondary">
        <p className="text-lg">No reviews yet</p>
        <p className="text-sm">Be the first to review this book!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-library-text mb-4">
        Reviews ({reviews.length})
      </h3>

      {reviews.map((review, index) => (
        <div key={index} className="card p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-library-primary rounded-full flex items-center justify-center">
                <FaUser className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-library-text">{review.userName}</p>
                <div className="flex items-center space-x-2 text-sm text-library-secondary">
                  <FaCalendarAlt className="h-3 w-3" />
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <StarRating rating={review.rating} size="text-sm" />
          </div>

          <p className="text-library-text leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;