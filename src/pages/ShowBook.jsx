// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import StarRating from "../components/StarRating";
import ReviewForm from "../components/ReviewForm";
import ReviewsList from "../components/ReviewsList";
import { useAuth } from "../contexts/AuthContext";
import { FaEdit, FaTrash, FaBook, FaUser, FaCalendarAlt, FaStar } from "react-icons/fa";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { getToken, user } = useAuth();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5556/books/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id, getToken]);

  const handleReviewAdded = (reviewData) => {
    // Update the book state with the new review and average rating
    setBook(prevBook => ({
      ...prevBook,
      reviews: [...(prevBook.reviews || []), reviewData.review],
      averageRating: reviewData.averageRating,
    }));
  };

  const isOwner = user && book.userId === user.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-library-background via-library-accent/20 to-library-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <BackButton />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Spinner />
              <p className="mt-4 text-library-secondary">Loading book details...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Book Header */}
            <div className="card p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-library-primary rounded-full flex items-center justify-center">
                      <FaBook className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-library-text">{book.title}</h1>
                      <p className="text-lg text-library-secondary">by {book.author}</p>
                    </div>
                  </div>

                  {/* Rating Display */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <StarRating rating={Math.round(book.averageRating || 0)} size="text-xl" />
                      <span className="text-lg font-semibold text-library-text">
                        {book.averageRating ? book.averageRating.toFixed(1) : '0.0'}
                      </span>
                    </div>
                    <span className="text-library-secondary">
                      ({book.reviews?.length || 0} reviews)
                    </span>
                  </div>

                  {/* Book Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <FaCalendarAlt className="h-5 w-5 text-library-primary" />
                      <div>
                        <p className="text-sm text-library-secondary">Published</p>
                        <p className="font-medium text-library-text">{book.publishYear}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaUser className="h-5 w-5 text-library-primary" />
                      <div>
                        <p className="text-sm text-library-secondary">Added by</p>
                        <p className="font-medium text-library-text">You</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {isOwner && (
                    <div className="flex space-x-3">
                      <Link
                        to={`/books/edit/${book._id}`}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <FaEdit className="h-4 w-4" />
                        <span>Edit Book</span>
                      </Link>
                      <Link
                        to={`/books/delete/${book._id}`}
                        className="btn-danger flex items-center space-x-2"
                      >
                        <FaTrash className="h-4 w-4" />
                        <span>Delete Book</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Book Description */}
            <div className="card p-8">
              <h2 className="text-2xl font-semibold text-library-text mb-4">About This Book</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-library-text leading-relaxed whitespace-pre-line">
                  {book.description}
                </p>
              </div>
            </div>

            {/* Review Form */}
            {user && (
              <ReviewForm bookId={id} onReviewAdded={handleReviewAdded} />
            )}

            {/* Reviews List */}
            <div className="card p-8">
              <ReviewsList reviews={book.reviews} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;
