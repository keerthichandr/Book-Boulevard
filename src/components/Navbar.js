import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li>
          <NavLink to="/" activeClassName="active">Book Search</NavLink>
        </li>
        <li>
          <NavLink to="/bookshelf" activeClassName="active">My Bookshelf</NavLink>
        </li>
        <li>
          <NavLink to="/read-books" activeClassName="active">Read Books</NavLink>
        </li>
        <li>
          <NavLink to="/unread-books" activeClassName="active">Unread Books</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;