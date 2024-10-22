import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
// import BookSearchPage from './components/BookSearchPage';
// import BookshelfPage from './components/PersonalBookshelfPage';
// import ReadBooksPage from './components/ReadBooksPage';
// import UnreadBooksPage from './components/UnreadBooksPage';
import MyBookshelfs from './components/MyBookshelfs';
import Login from './components/Login';
import { AnimatePresence } from 'framer-motion';
import userLoggedIn from './utils/userLoggedIn';
import BookSearchUp from './components/BookSearchUp';
import { useEffect, useState } from 'react';
function App() {
  const location = useLocation();
  const [logg,setLogg]=useState(null)
  

  useEffect(()=>{
    const data={
     log:null
    };
    setLogg(data.log)
  },[])
  return (
    <div>
      
      <userLoggedIn.Provider value={{loggedInUser:logg,setLogg}}>
      <Navbar/>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login/>} />
          <Route path="/booksearch" element={<BookSearchUp/>} />
          <Route path="/bookshelf" element={<MyBookshelfs/>} />
        </Routes>
      </AnimatePresence>
      </userLoggedIn.Provider>
    </div>
  );
}

export default App;
