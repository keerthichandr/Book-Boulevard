import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import './BookShelfPage.css';
import { motion } from 'framer-motion';

const UnreadBooksPage = () => {
  const [unreadBooks, setUnreadBooks] = useState([]);

  useEffect(() => {
    const storedBookshelf = localStorage.getItem('bookshelf');
    if (storedBookshelf) {
      const bookshelf = JSON.parse(storedBookshelf);
      setUnreadBooks(bookshelf.filter((book) => !book.read));
    }
  }, []);

  return (
    <div className="bookshelf-page">
      <h2>Unread Books</h2>
      {unreadBooks.length === 0 ? (
        <p className="empty-bookshelf">You have no unread books.</p>
      ) : (
        <motion.div
          className="book-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {unreadBooks.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default UnreadBooksPage;
