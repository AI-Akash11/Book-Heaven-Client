// src/components/Banner.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const images = [
  "https://i.ibb.co.com/27fXYgrK/Zombie-FANG-YUAN.jpg",
  "https://i.ibb.co.com/nqq5xnrR/download.jpg",
  "https://i.ibb.co.com/M5RZDQvm/lotm.jpg",
  "https://i.ibb.co.com/8n5JQmdQ/Reverend-insanity.jpg",
  "https://i.ibb.co.com/LXMr2z1v/Fang-Yuan-wants-to-recover-his-extreme-eagle.jpg",
  "https://i.ibb.co.com/j0MX5cZ/witcher.jpg",
  "https://i.ibb.co.com/1Y0r19w5/got.jpg",
];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);

    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <div
      className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
        
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <img
              src={images[index]}
              alt={`Book cover ${index + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto 
                   flex flex-col items-center justify-center 
                   mb-8 sm:mb-10 md:mb-12" 
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-amber-400 drop-shadow-2xl mb-2 sm:mb-3 font-cinzel leading-tight">
          The Book Heaven
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-xl mx-auto leading-relaxed px-2">
          Discover enchanted realms, timeless heroes, and stories beyond imagination.
        </p>
      </motion.div>

      <div className="absolute bottom-10 sm:bottom-16 md:bottom-16 left-1/2 -translate-x-1/2 
                      flex flex-col sm:flex-row gap-3 sm:gap-5 z-20 items-center">
        <Link to="/all-books">
          <button className="bg-amber-400 hover:bg-amber-500 text-black font-semibold 
                           px-6 py-3 sm:px-7 sm:py-3.5 rounded-lg shadow-lg 
                           transition-all duration-300 hover:scale-105 
                           text-sm sm:text-base w-48 sm:w-auto">
            Explore Books
          </button>
        </Link>
        <Link to="/add-book">
          <button className="bg-amber-400 hover:bg-amber-500 text-black font-semibold 
                           px-6 py-3 sm:px-7 sm:py-3.5 rounded-lg shadow-lg 
                           transition-all duration-300 hover:scale-105 
                           text-sm sm:text-base w-48 sm:w-auto">
            Add Book
          </button>
        </Link>
      </div>

      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              i === index
                ? "bg-amber-400 w-8 sm:w-10 h-1.5 sm:h-2"
                : "bg-white/60 w-1.5 sm:w-2 h-1.5 sm:h-2 hover:bg-white"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;