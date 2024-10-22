import { useState,useContext } from "react";
import userLoggedIn from "../utils/userLoggedIn";
import './BookSearchPage.css';
const RecommendationsList = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { loggedInUser, setLogg, userInfo, setUserInfo }=useContext(userLoggedIn)

  const addData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const author = data.Author;
    const book = data.Book;
    const userid=localStorage.getItem('userId');
     
    
    try {
      const response = await fetch('https://vickyacharjee14.pythonanywhere.com/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, book,userid}),
      });

      if (!response.ok) {
        setSuccess(false);
        setError("Book already available in your list.");
         
      }else{
        const responseData = await response.json();
        console.log('Book saved:', responseData);
        setSuccess(true);
      }
   
    } catch (error) {
      setError('Failed to save the book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="recommendations">
      <button className="save-btn"onClick={addData} disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add'}
      </button>
      {error && <p className="book-save-error">{error}</p>}
      {success && <p className="book-save-success">Book saved successfully!</p>}
      <h1 className="book-detail">Author: {data.Author}</h1>
      <h1 className="book-detail">Book: {data.Book}</h1>
    </div>
  )
}

export default RecommendationsList;