import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import BookModal from "./BookModal";
import StarRating from "../StarRating";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="card p-6 m-4 relative group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out border-l-4 border-l-library-primary">
      {/* Publish Year Badge */}
      <div className="absolute -top-3 -right-3 bg-library-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
        {book.publishYear}
      </div>

      {/* Book ID */}
      <div className="text-xs text-library-secondary mb-4 font-mono">
        ID: {book._id.slice(-8)}
      </div>

      {/* Book Title */}
      <div className="flex justify-start items-center gap-x-3 mb-4">
        <div className="h-10 w-10 bg-library-primary/10 rounded-lg flex items-center justify-center">
          <PiBookOpenTextLight className="text-library-primary text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-library-text group-hover:text-library-primary transition-colors duration-300 line-clamp-2">
            {book.title}
          </h2>
        </div>
      </div>

      {/* Author */}
      <div className="flex justify-start items-center gap-x-3 mb-4">
        <div className="h-8 w-8 bg-library-secondary/10 rounded-full flex items-center justify-center">
          <BiUserCircle className="text-library-secondary text-lg" />
        </div>
        <div>
          <p className="text-library-secondary font-medium">
            {book.author}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <StarRating rating={Math.round(book.averageRating || 0)} size="text-sm" />
          <span className="text-sm font-medium text-library-text">
            {book.averageRating ? book.averageRating.toFixed(1) : '0.0'}
          </span>
        </div>
        <span className="text-xs text-library-secondary">
          ({book.reviews?.length || 0})
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-library-accent/20">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center w-12 h-12 bg-library-accent/20 hover:bg-library-accent rounded-xl transition-all duration-300 ease-in-out transform hover:scale-110 group"
          title="Quick View"
        >
          <BiShow className="text-xl text-library-secondary group-hover:text-library-text transition-colors" />
        </button>

        <Link
          to={`/books/details/${book._id}`}
          className="flex items-center justify-center w-12 h-12 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-110 group"
          title="View Details"
        >
          <BsInfoCircle className="text-xl text-blue-600 group-hover:text-blue-700 transition-colors" />
        </Link>

        <Link
          to={`/books/edit/${book._id}`}
          className="flex items-center justify-center w-12 h-12 bg-amber-50 hover:bg-amber-100 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-110 group"
          title="Edit Book"
        >
          <AiOutlineEdit className="text-xl text-amber-600 group-hover:text-amber-700 transition-colors" />
        </Link>

        <Link
          to={`/books/delete/${book._id}`}
          className="flex items-center justify-center w-12 h-12 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-110 group"
          title="Delete Book"
        >
          <MdOutlineDelete className="text-xl text-red-600 group-hover:text-red-700 transition-colors" />
        </Link>
      </div>

      {/* Book Modal */}
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
