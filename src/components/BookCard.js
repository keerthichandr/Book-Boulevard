import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './BookCard.css';
import { FaPlusCircle, FaMinusCircle, FaCheckCircle, FaCircle } from 'react-icons/fa';


const BookCard = ({ book, addToBookshelf, removeFromBookshelf, markAsReadToggle }) => {
  const { title, author_name, edition_count, key, cover_i, read } = book;
  const coverUrl = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : 'https://via.placeholder.com/150';
  const [isInBookshelf, setIsInBookshelf] = useState(false);

  useEffect(() => {
    const storedBookshelf = localStorage.getItem('bookshelf') || '[]';
    const bookshelf = JSON.parse(storedBookshelf);
    setIsInBookshelf(bookshelf.some((b) => b.key === key));
  }, [key]);

  const handleAddToBookshelf = () => {
    const storedBookshelf = localStorage.getItem('bookshelf') || '[]';
    const bookshelf = JSON.parse(storedBookshelf);
    if (!bookshelf.some((b) => b.key === key)) {
      const updatedBookshelf = [...bookshelf, book];
      localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
      setIsInBookshelf(true);
      if (addToBookshelf) {
        addToBookshelf(book);
      }
    }
  };

  const handleRemoveFromBookshelf = () => {
    const storedBookshelf = localStorage.getItem('bookshelf') || '[]';
    const bookshelf = JSON.parse(storedBookshelf);
    const updatedBookshelf = bookshelf.filter((b) => b.key !== key);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    setIsInBookshelf(false);
    if (removeFromBookshelf) {
      removeFromBookshelf(key);
    }
  };

  return (
    <motion.div
      className="book-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="book-cover">
        <img src={coverUrl} alt={title} />
      </div>
      <div className="book-details">
        <h3>{title}</h3>
        <p>Author: {author_name ? author_name.join(', ') : 'Unknown'}</p>
        <p>Edition Count: {edition_count}</p>
        <div className="book-actions">
          {removeFromBookshelf ? (
            <>
              <button onClick={(e) => { e.stopPropagation(); handleRemoveFromBookshelf(); }}> <FaMinusCircle /> Remove from Bookshelf</button>
              <button onClick={(e) => { e.stopPropagation(); markAsReadToggle(key); }}>
                {read ? <FaCircle />: <FaCheckCircle /> } Mark as {read ? 'Unread' : 'Read'}
              </button>
            </>
          ) : isInBookshelf ? (
            <p>Already in your bookshelf. Go to "My Bookshelf" to remove the book.</p>
          ) : (
            <button onClick={(e) => { e.stopPropagation(); handleAddToBookshelf(); }}> <FaPlusCircle /> Add to Bookshelf</button>
          )}
        </div>
        {read !== undefined && (
          <div className={`status-mark ${read ? 'read' : 'unread'}`}>
            {read ? '✅' : ''}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;
