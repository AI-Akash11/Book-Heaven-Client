import React from 'react';
import { Link } from 'react-router';

const AboutSection = () => {
  return (
    <section className="py-20 mb-10 bg-linear-to-b from-teal-200 to-amber-100 rounded-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-teal-700 mb-6">
            About The Book Haven
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Your cozy corner of the internet where stories come alive.
          </p>

          {/* Main Description */}
          <div className="prose prose-lg mx-auto text-gray-700 space-y-5">
            <p>
              Welcome to <span className="font-semibold text-teal-600">The Book Haven</span> — a
              community-driven platform for book lovers to discover, share, and celebrate the joy of
              reading.
            </p>
            <p>
              Whether you're hunting for your next page-turner, exploring hidden gems across genres,
              or connecting with fellow readers, we’ve built this space to feel like your personal
              library — warm, inviting, and full of wonder.
            </p>
            <p>
              From timeless classics to the latest releases, every book has a home here. Rate, review,
              and revisit your favorites. Let’s build a haven where every story matters.
            </p>
          </div>

          {/* Call to Action */}
          <div className="mt-10">
            <Link to={'/all-books'} className="px-8 py-3 bg-teal-600 text-white font-medium text-lg rounded-lg hover:bg-teal-700 transition shadow-md">
              Explore All Books
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;