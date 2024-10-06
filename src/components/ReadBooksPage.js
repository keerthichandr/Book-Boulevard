import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import './BookShelfPage.css';
import { motion } from 'framer-motion';

const ReadBooksPage = () => {
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    const storedBookshelf = localStorage.getItem('bookshelf');
    if (storedBookshelf) {
      const bookshelf = JSON.parse(storedBookshelf);
      setReadBooks(bookshelf.filter((book) => book.read));
    }
  }, []);

  return (
    <div className="bookshelf-page">
      <h2>Read Books</h2>
      {readBooks.length === 0 ? (
        <p className="empty-bookshelf">You have no read books.</p>
      ) : (
        <motion.div
          className="book-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {readBooks.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ReadBooksPage;
