import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../context/AuthContext';
import Spinner from './Spinner';
import { Star } from 'lucide-react';

const LatestBooks = () => {
  const axios = useAxios();
  const [latestBooks, setLatestBooks] = useState([]);
  const { loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/latest-books')
      .then((data) => {
        console.log(data.data);
        setLatestBooks(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axios, setLoading]);

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

  if (loading) {
    return (
      <div className="w-10 mx-auto">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="my-20 w-[90%] mx-auto">
      <h2 className="text-5xl font-bold text-teal-600 mb-6 text-center">Latest Books</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestBooks.map((book) => {
          const id = book._id?.$oid || book._id;
          const title = book.title || "Unknown";
          const author = book.author || "Unknown";
          const genre = book.genre || "N/A";
          const rating = parseFloat(book.rating?.$numberDouble || book.rating || 0);
          const cover = book.coverImage || "https://via.placeholder.com/200x280?text=No+Image";

          return (
            <div
              key={id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-102 flex flex-col h-full pt-2"
            >
              <div className="p-4 flex flex-col h-full">
                {/* Cover Image */}
                <div className="mb-4 flex justify-center">
                  <img
                    src={cover}
                    alt={title}
                    className="w-[80%] object-cover rounded-lg"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/200x280?text=No+Image")}
                  />
                </div>

                {/* Book Info - Takes remaining space */}
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 leading-tight">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    by <span className="font-medium">{author}</span>
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 text-xs font-medium text-teal-600 bg-teal-50 rounded-full">
                      {genre}
                    </span>
                    <div className="text-sm">{renderStars(rating)}</div>
                  </div>
                </div>

                {/* Button - Always at bottom */}
                <Link
                  to={`/book-details/${id}`}
                  className="block w-full text-center mt-4 px-4 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestBooks;