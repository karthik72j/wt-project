// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuth } from "../contexts/AuthContext";
import { FaPlus, FaBookOpen } from "react-icons/fa";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { getToken } = useAuth();

  const handleSaveBook = () => {
    if (!title || !author || !publishYear || !description) {
      enqueueSnackbar("Please fill in all fields", { variant: "warning" });
      return;
    }

    const data = {
      title,
      author,
      publishYear,
      description,
    };
    setLoading(true);
    axios
      .post("http://localhost:5556/books", data, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book added to your library!", { variant: "success" });
        navigate("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error adding book to library", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-library-background via-library-accent/20 to-library-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <BackButton />
          <div className="mx-auto h-16 w-16 bg-library-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
            <FaPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-library-text mb-2">
            Add New Book
          </h1>
          <p className="text-library-secondary">
            Expand your personal library collection
          </p>
        </div>

        {/* Form */}
        <div className="card p-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Spinner />
                <p className="mt-4 text-library-secondary">Adding book to your library...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-library-text mb-2">
                  Book Title
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaBookOpen className="h-5 w-5 text-library-primary" />
                  </div>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field pl-12"
                    placeholder="Enter the book title"
                    required
                  />
                </div>
              </div>

              {/* Author Field */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-library-text mb-2">
                  Author Name
                </label>
                <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="input-field"
                  placeholder="Enter the author's name"
                  required
                />
              </div>

              {/* Publish Year Field */}
              <div>
                <label htmlFor="publishYear" className="block text-sm font-medium text-library-text mb-2">
                  Publication Year
                </label>
                <input
                  id="publishYear"
                  type="number"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  className="input-field"
                  placeholder="e.g., 2023"
                  min="1000"
                  max={new Date().getFullYear()}
                  required
                />
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-library-text mb-2">
                  Book Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field resize-none"
                  placeholder="Write a brief description of the book..."
                  rows="4"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  onClick={handleSaveBook}
                  className="btn-primary w-full flex justify-center items-center space-x-2"
                >
                  <FaPlus className="h-5 w-5" />
                  <span>Add to Library</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBooks;
