import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { Star } from "lucide-react";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState("");

  const axios = useAxios();
  const { setLoading: setGlobalLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchBooks = async () => {
      setLocalLoading(true);
      setError("");
      setGlobalLoading?.(true);

      try {
        const res = await axios.get("/books");
        const data = Array.isArray(res.data) ? res.data : [];
        setBooks(data);
      } catch (err) {
        setError("Failed to load books.");
        setBooks([]);
      } finally {
        setLocalLoading(false);
        setGlobalLoading?.(false);
      }
    };

    fetchBooks();
  }, [axios, setGlobalLoading]);

  const renderStars = (rating) => {
    const num = parseFloat(rating) || 0;
    const full = Math.floor(num);
    const hasHalf = num % 1 >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(full)].map((_, i) => (
          <Star key={`f-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalf && <Star className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />}
        {[...Array(empty)].map((_, i) => (
          <Star key={`e-${i}`} className="w-4 h-4 fill-gray-200 text-gray-300" />
        ))}
        <span className="ml-1 text-xs text-gray-600">({num.toFixed(1)})</span>
      </div>
    );
  };

  if (localLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl  md:text-4xl font-bold text-center text-amber-600">
        All Books
      </h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No books found.</p>
      ) : (
        <div className="rounded-lg shadow-md border border-gray-200 overflow-hidden bg-white">

          {/* ========== DESKTOP ========== */}
          <div className="hidden lg:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cover</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Genre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {books.map((book) => {
                  const id = book._id?.$oid || book._id;
                  const title = book.title || "Unknown";
                  const author = book.author || "Unknown";
                  const genre = book.genre || "N/A";
                  const rating = parseFloat(book.rating?.$numberDouble || book.rating || 0);
                  const cover = book.coverImage || "https://via.placeholder.com/80x100?text=No+Image";

                  return (
                    <tr key={id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={cover} alt={title} className="w-12 h-16 object-cover rounded shadow-sm" />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate">{title}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{author}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium text-teal-600 bg-teal-50 rounded-full">
                          {genre}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{renderStars(rating)}</td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          to={`/book-details/${id}`}
                          className="inline-block px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded hover:bg-teal-700 transition"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ========== MEDIUM TABLET ========== */}
          <div className="hidden md:block lg:hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Cover</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Title & Author</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Genre & Rating</th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {books.map((book) => {
                  const id = book._id?.$oid || book._id;
                  const title = book.title || "Unknown";
                  const author = book.author || "Unknown";
                  const genre = book.genre || "N/A";
                  const rating = parseFloat(book.rating?.$numberDouble || book.rating || 0);
                  const cover = book.coverImage || "https://via.placeholder.com/80x100?text=No+Image";

                  return (
                    <tr key={id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <img src={cover} alt={title} className="w-12 h-16 object-cover rounded shadow-sm" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{title}</div>
                        <div className="text-sm text-gray-600 mt-1">by {author}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="mb-2">
                          <span className="px-2 py-1 text-xs font-medium text-teal-600 bg-teal-50 rounded-full">
                            {genre}
                          </span>
                        </div>
                        <div className="text-sm">{renderStars(rating)}</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Link
                          to={`/book-details/${id}`}
                          className="inline-block px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded hover:bg-teal-700 transition"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ========== SMALL TABLET  ========== */}
          <div className="hidden sm:block md:hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Cover</th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Book Details</th>
                  <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {books.map((book) => {
                  const id = book._id?.$oid || book._id;
                  const title = book.title || "Unknown";
                  const author = book.author || "Unknown";
                  const genre = book.genre || "N/A";
                  const rating = parseFloat(book.rating?.$numberDouble || book.rating || 0);
                  const cover = book.coverImage || "https://via.placeholder.com/80x100?text=No+Image";

                  return (
                    <tr key={id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap">
                        <img src={cover} alt={title} className="w-14 h-18 object-cover rounded shadow-sm" />
                      </td>
                      <td className="px-3 py-4">
                        <div className="text-sm font-semibold text-gray-900 truncate mb-1">{title}</div>
                        <div className="text-xs text-gray-600 mb-1">by {author}</div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="px-2 py-1 text-xs font-medium text-teal-600 bg-teal-50 rounded-full">
                            {genre}
                          </span>
                          <div className="text-xs">{renderStars(rating)}</div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center">
                        <Link
                          to={`/book-details/${id}`}
                          className="inline-block w-full px-3 py-2 text-xs font-medium text-white bg-teal-600 rounded hover:bg-teal-700 transition"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ========== MOBILE ========== */}
          <div className="sm:hidden">
            <div className="space-y-4 p-4">
              {books.map((book) => {
                const id = book._id?.$oid || book._id;
                const title = book.title || "Unknown";
                const author = book.author || "Unknown";
                const genre = book.genre || "N/A";
                const rating = parseFloat(book.rating?.$numberDouble || book.rating || 0);
                const cover = book.coverImage || "https://via.placeholder.com/80x100?text=No+Image";

                return (
                  <div
                    key={id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col"
                  >
                    {/* Image + Details Side by Side */}
                    <div className="flex gap-4 mb-4">
                      {/* Bigger Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={cover}
                          alt={title}
                          className="w-24 h-32 object-cover rounded-lg shadow-sm"
                        />
                      </div>

                      {/* Book Details */}
                      <div className="flex-1 space-y-1.5">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>
                        <p className="text-sm text-gray-600">
                          by <span className="font-medium">{author}</span>
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-1 text-xs font-medium text-teal-600 bg-teal-50 rounded-full">
                            {genre}
                          </span>
                          <div className="text-sm">{renderStars(rating)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Button at Bottom */}
                    <Link
                      to={`/book-details/${id}`}
                      className="mt-auto block w-full text-center px-6 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition"
                    >
                      View Details
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooks;