import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import './BookShelfPage.css';
import { motion } from 'framer-motion';

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = localStorage.getItem('bookshelf');
    if (storedBookshelf) {
      setBookshelf(JSON.parse(storedBookshelf));
    }
  }, []);

  const removeFromBookshelf = (key) => {
    const updatedBookshelf = bookshelf.filter((book) => book.key !== key);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  const markAsReadToggle = (key) => {
    const updatedBookshelf = bookshelf.map((book) => {
      if (book.key === key) {
        return { ...book, read: !book.read };
      }
      return book;
    });
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <div className="bookshelf-page">
      <h2>My Bookshelf</h2>
      {bookshelf.length === 0 ? (
        <p className="empty-bookshelf">Your bookshelf is empty.</p>
      ) : (
        <motion.div
          className="book-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {bookshelf.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              removeFromBookshelf={removeFromBookshelf}
              markAsReadToggle={markAsReadToggle}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BookshelfPage;
