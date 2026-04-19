import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSnackbar } from "notistack";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineLogout, MdTableChart, MdViewModule } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  const { user, logout, getToken } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5556/books", {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Error loading your library", { variant: "error" });
        setLoading(false);
      });
  }, [getToken, enqueueSnackbar]);

  const handleLogout = () => {
    logout();
    enqueueSnackbar("See you next time in our library!", { variant: "success" });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-library-background via-library-accent/10 to-library-background">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-library-accent/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-library-primary rounded-full flex items-center justify-center shadow-lg">
                <FaBookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-library-text">
                  Welcome back, {user?.email?.split('@')[0]}!
                </h1>
                <p className="text-library-secondary text-sm">
                  {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/books/create" className="btn-primary flex items-center space-x-2">
                <MdOutlineAddBox className="h-5 w-5" />
                <span>Add Book</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-library-secondary hover:bg-library-primary text-white px-4 py-2 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                <MdOutlineLogout className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-library-accent/20">
            <div className="flex space-x-1">
              <button
                onClick={() => setShowType("card")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  showType === "card"
                    ? "bg-library-primary text-white shadow-md transform scale-105"
                    : "text-library-text hover:bg-library-accent/20"
                }`}
              >
                <MdViewModule className="h-5 w-5" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setShowType("table")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  showType === "table"
                    ? "bg-library-primary text-white shadow-md transform scale-105"
                    : "text-library-text hover:bg-library-accent/20"
                }`}
              >
                <MdTableChart className="h-5 w-5" />
                <span>Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* Books Display */}
        <div className="transition-all duration-500 ease-in-out">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Spinner />
                <p className="mt-4 text-library-secondary">Loading your library...</p>
              </div>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="h-24 w-24 bg-library-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaBookOpen className="h-12 w-12 text-library-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-library-text mb-2">
                  Your library is empty
                </h3>
                <p className="text-library-secondary mb-6">
                  Start building your collection by adding your first book.
                </p>
                <Link to="/books/create" className="btn-primary inline-flex items-center space-x-2">
                  <MdOutlineAddBox className="h-5 w-5" />
                  <span>Add Your First Book</span>
                </Link>
              </div>
            </div>
          ) : showType === "table" ? (
            <div className="card p-6">
              <BooksTable books={books} />
            </div>
          ) : (
            <BooksCard books={books} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;