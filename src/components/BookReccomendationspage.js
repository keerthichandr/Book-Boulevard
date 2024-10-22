import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "text-white font-bold" : "text-gray-300 hover:text-white"}>Book Search</NavLink>
        </li>
        <li>
          <NavLink to="/bookshelf" className={({ isActive }) => isActive ? "text-white font-bold" : "text-gray-300 hover:text-white"}>My Bookshelf</NavLink>
        </li>
        <li>
          <NavLink to="/read-books" className={({ isActive }) => isActive ? "text-white font-bold" : "text-gray-300 hover:text-white"}>Read Books</NavLink>
        </li>
        <li>
          <NavLink to="/unread-books" className={({ isActive }) => isActive ? "text-white font-bold" : "text-gray-300 hover:text-white"}>Unread Books</NavLink>
        </li>
        <li>
          <NavLink to="/book-recommendations" className={({ isActive }) => isActive ? "text-white font-bold" : "text-gray-300 hover:text-white"}>Book Recommendations</NavLink>
        </li>
      </ul>
    </nav>
  );
};

const SearchInterface = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState('');
  const [resultBackground, setResultBackground] = useState('');

  const handleSearch = () => {
    if (searchTerm) {
      setResult(`You searched for: ${searchTerm}`);
      setResultBackground('bg-blue-100');
    } else {
      setResult('Please enter a search term.');
      setResultBackground('bg-yellow-100');
    }
  };

  const handleEndRecommendations = () => {
    setResult('Recommendations ended.');
    setResultBackground('bg-pink-100');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search Interface</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow px-4 py-2 text-lg border-2 border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          placeholder="Enter your search..."
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
        >
          Search
        </button>
      </div>
      <button
        onClick={handleEndRecommendations}
        className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition duration-300"
      >
        End Recommendations
      </button>
      {result && (
        <div className={`mt-4 p-4 rounded ${resultBackground}`}>
          {result}
        </div>
      )}
    </div>
  );
};