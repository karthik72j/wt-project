import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-library-primary/5">
            <th className="px-6 py-4 text-left text-sm font-semibold text-library-text border-b border-library-accent/20">
              #
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-library-text border-b border-library-accent/20">
              <div className="flex items-center space-x-2">
                <PiBookOpenTextLight className="text-library-primary" />
                <span>Title</span>
              </div>
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-library-text border-b border-library-accent/20 max-md:hidden">
              <div className="flex items-center space-x-2">
                <BiUserCircle className="text-library-secondary" />
                <span>Author</span>
              </div>
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-library-text border-b border-library-accent/20 max-md:hidden">
              Year
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-library-text border-b border-library-accent/20">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className="hover:bg-library-accent/5 transition-colors duration-200 group"
            >
              <td className="px-6 py-4 text-sm text-library-secondary font-medium border-b border-library-accent/10">
                {index + 1}
              </td>
              <td className="px-6 py-4 border-b border-library-accent/10">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-library-primary/10 rounded-lg flex items-center justify-center">
                    <PiBookOpenTextLight className="text-library-primary text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-library-text group-hover:text-library-primary transition-colors">
                      {book.title}
                    </p>
                    <p className="text-xs text-library-secondary md:hidden">
                      by {book.author}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-library-text border-b border-library-accent/10 max-md:hidden">
                {book.author}
              </td>
              <td className="px-6 py-4 text-sm text-library-secondary border-b border-library-accent/10 max-md:hidden">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-library-primary/10 text-library-primary">
                  {book.publishYear}
                </span>
              </td>
              <td className="px-6 py-4 border-b border-library-accent/10">
                <div className="flex justify-center space-x-2">
                  <Link
                    to={`/books/details/${book._id}`}
                    className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110 group"
                    title="View Details"
                  >
                    <BsInfoCircle className="text-lg text-blue-600 group-hover:text-blue-700" />
                  </Link>
                  <Link
                    to={`/books/edit/${book._id}`}
                    className="p-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110 group"
                    title="Edit Book"
                  >
                    <AiOutlineEdit className="text-lg text-amber-600 group-hover:text-amber-700" />
                  </Link>
                  <Link
                    to={`/books/delete/${book._id}`}
                    className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110 group"
                    title="Delete Book"
                  >
                    <MdOutlineDelete className="text-lg text-red-600 group-hover:text-red-700" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {books.length === 0 && (
        <div className="text-center py-12">
          <div className="text-library-secondary">
            <PiBookOpenTextLight className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No books in your collection yet.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksTable;
