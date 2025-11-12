import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useAxios from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import { Star, ArrowLeft } from "lucide-react";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();
  const { loading, setLoading } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load book details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id, axios, setLoading]);

  // Render star rating
  const renderStars = (rating) => {
    const num = parseFloat(rating);
    const full = Math.floor(num);
    const hasHalf = num % 1 >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(full)].map((_, i) => (
          <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalf && (
          <Star className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />
        )}
        {[...Array(empty)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5 fill-gray-200 text-gray-300" />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }


  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-teal-600 hover:underline font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>
      </div>
    );
  }


  if (!book) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Book not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 inline-flex items-center gap-2 text-teal-600 hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>
      </div>
    );
  }


  const title = book.title || "Untitled";
  const author = book.author || "Unknown Author";
  const genre = book.genre || "N/A";
  const rating = parseFloat(book.rating?.$numberDouble || book.rating || 0);
  const description = (book.description || "").replace(/\\n/g, "\n");
  const coverImage = book.coverImage || "https://via.placeholder.com/300x450?text=No+Image";


  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-teal-600 hover:underline font-medium transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Book Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cover Image */}
          <div className="md:col-span-1 p-6 bg-gray-50 flex justify-center items-start">
            <img
              src={coverImage}
              alt={`${title} cover`}
              className="w-full max-w-xs md:max-w-full h-auto rounded-lg shadow-md object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
              }}
            />
          </div>

          {/* Details */}
          <div className="md:col-span-2 p-6 space-y-6">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h1>

            {/* Author */}
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Author:</span> {author}
            </p>

            {/* Genre */}
            <p className="text-sm font-medium text-teal-600 bg-teal-50 inline-block px-3 py-1 rounded-full">
              {genre}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Rating:</span>
              {renderStars(rating)}
              <span className="ml-1 text-gray-600">({rating.toFixed(1)})</span>
            </div>


            {/* Description */}
            {description && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;