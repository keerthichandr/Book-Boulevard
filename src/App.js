import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import BookSearchPage from './components/BookSearchPage';
import BookshelfPage from './components/PersonalBookshelfPage';
import ReadBooksPage from './components/ReadBooksPage';
import UnreadBooksPage from './components/UnreadBooksPage';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<BookSearchPage />} />
          <Route path="/bookshelf" element={<BookshelfPage />} />
          <Route path="/read-books" element={<ReadBooksPage />} />
          <Route path="/unread-books" element={<UnreadBooksPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
