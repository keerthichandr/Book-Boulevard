import React, {  useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import ConfirmationModal from './ConfirmationModal'; // Import the modal component

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleLogout = () => {
    setIsModalOpen(true); // Open the confirmation modal
  };

  const confirmLogout = () => {
    localStorage.clear(); // Clear local storage
    setIsModalOpen(false); // Close the modal
    navigate('/'); // Redirect to home page
  };

  const cancelLogout = () => {
    setIsModalOpen(false); // Close the confirmation modal
  };

  useEffect(() => {
    setUserName(localStorage.getItem('userId'));
  }); 

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {localStorage.getItem('userId') ? (
          <>
            <li>
              <NavLink to="/booksearch" activeClassName="active">Book Search</NavLink>
            </li>
            <li>
              <NavLink to="/bookshelf" activeClassName="active">My Bookshelf</NavLink>
            </li>
            <li onClick={handleLogout}>
              <NavLink to="/" activeClassName="active" onClick={(e) => e.preventDefault()}>Log-Out</NavLink>
            </li>
            <li className='user-name'>
              Hi, {userName}
            </li>
          </>
        ) : (
          console.log("here")
        )}
      </ul>

      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={isModalOpen} 
        message="Are you sure you want to log out?" 
        onConfirm={confirmLogout} 
        onCancel={cancelLogout} 
      />
    </nav>
  );
};

export default Navbar;
