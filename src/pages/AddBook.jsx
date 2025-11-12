import React, { useContext } from 'react';
import { format } from 'date-fns';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AddBook = () => {
    const {user} = useContext(AuthContext)

    const axios = useAxios()


    const handleAddBook = (e)=>{
        e.preventDefault();
        const form= e.target;

        const title = form.title.value;
        const author = form.author.value;
        const genre = form.genre.value;
        const rating = form.rating.value;
        const summary = form.summary.value;
        const description = form.description.value;
        const coverImage = form.cover_image.value;
        const userEmail = user.email;
        const userName = user.displayName;
        const created_at = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'")

        const bookData = {
      title,
      author,
      genre,
      rating: parseFloat(rating),
      summary,
      description,
      coverImage,
      userEmail,
      userName,
      created_at,
    };
    // console.log(bookData)


    axios
    .post("/books",bookData)
    .then((data)=>{
        console.log(data.data);

        if(data.data.insertId){
            toast.success("Book created successfully")
        }
    })
    .catch(err =>{
        console.log(err)
    })
    form.reset();
    }
  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-teal-700 mb-10">
            Add New Book
          </h1>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-10">
            <form onSubmit={handleAddBook} className="space-y-8">

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Book Title <span className="text-red-500">*</span>
                </label>
                <input
                required
                name='title'
                  type="text"
                  id="title"
                  placeholder="Enter book title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Author */}
              <div>
                <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                required
                name='author'
                  type="text"
                  id="author"
                  placeholder="Enter author name..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Genre */}
              <div>
                <label htmlFor="genre" className="block text-sm font-semibold text-gray-700 mb-2">
                  Genre <span className="text-red-500">*</span>
                </label>
                <select
                name='genre'
                  id="genre"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-800"
                >
                  <option value="">Select a genre...</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Dark Fantasy">Dark Fantasy</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Horror">Horror</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label htmlFor="rating" className="block text-sm font-semibold text-gray-700 mb-2">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                  name='rating'
                    type="number"
                    id="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="4.8"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-800 placeholder-gray-400"
                  />
                  <span className="text-sm text-gray-500 whitespace-nowrap">/ 5.0</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter a value between 0 and 5</p>
              </div>

              {/* Summary */}
              <div>
                <label htmlFor="summary" className="block text-sm font-semibold text-gray-700 mb-2">
                  Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                required
                name='summary'
                  id="summary"
                  rows="3"
                  placeholder="A short, captivating summary of the book..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-800 placeholder-gray-400 resize-none"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Max 300 characters</p>
              </div>

              {/* Cover Image URL */}
              <div>
                <label htmlFor="coverImage" className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Image URL <span className="text-red-500">*</span>
                </label>
                <input
                required
                name='cover_image'
                  type="url"
                  id="coverImage"
                  placeholder="https://example.com/book-cover.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-800 placeholder-gray-400"
                />
                <p className="text-xs text-gray-500 mt-1">Paste a direct link to the book cover</p>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Description <span className="text-red-500">*</span>
                </label>
                <textarea
                required
                name='description'
                  id="description"
                  rows="6"
                  placeholder="Write a detailed description of the book, including plot, themes, and key highlights..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-800 placeholder-gray-400 resize-none"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Tell readers why this book is special</p>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full py-4 bg-teal-600 text-white font-bold text-lg rounded-lg hover:bg-teal-700 transition shadow-lg transform hover:scale-105 duration-200 hover:cursor-pointer"
                >
                  Add Book to Library
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;