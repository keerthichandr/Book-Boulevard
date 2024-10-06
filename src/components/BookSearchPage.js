import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import './BookSearchPage.css';
import LoadingIndicator from './LoadingIndicator';

const BookSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [progress, setProgress] = useState(0);

useEffect(() => {
  let timer;
  const delaySearch = setTimeout(async () => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      setProgress(0); 

      const startTime = new Date().getTime();
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${searchTerm}&limit=10&page=1`
      );

      const endTime = new Date().getTime();
      const elapsedTime = endTime - startTime;
      const loadingTime = 1000; 
      const progressInterval = loadingTime / 100; 

      timer = setInterval(() => {
        const currentProgress = Math.min(Math.floor((elapsedTime / loadingTime) * 100), 99);
        setProgress(currentProgress);
      }, progressInterval);

      setTimeout(() => {
        clearInterval(timer);
        setProgress(100);
        setBooks(response.data.docs);
        setIsSearching(false);
      }, loadingTime);
    } else {
      setBooks([]);
      setProgress(0);
    }
  }, 500);

  return () => {
    clearTimeout(delaySearch);
    clearInterval(timer);
  };
}, [searchTerm]);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchTerm.trim()) {
        setIsSearching(true);
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${searchTerm}&limit=10&page=1`
        );
        setBooks(response.data.docs);
        setIsSearching(false);
      } else {
        setBooks([]);
      }
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const addToBookshelf = (book) => {
    const storedBookshelf = localStorage.getItem('bookshelf') || '[]';
    const bookshelf = JSON.parse(storedBookshelf);
    if (!bookshelf.some((b) => b.key === book.key)) {
      const updatedBookshelf = [...bookshelf, book];
      localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    }
  };

  return (
    <div className="book-search-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Hi there! What would you like to read today?"
          value={searchTerm}
          onChange={handleSearch}
        />
        {isSearching && <LoadingIndicator progress={progress} />}
      </div>
      <div className="book-results">
        {books.map((book) => (
          <BookCard key={book.key} book={book} addToBookshelf={addToBookshelf} />
        ))}
      </div>
    </div>
  );
};

export default BookSearchPage;
