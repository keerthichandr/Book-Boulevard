import './BookSearchPage.css';
import { useState, useEffect } from 'react';
import RecommendationsList from './RecommendationsList';
import logo from  './loader.gif'

const BookSearchUp = () => {
  const [list, setList] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); 

  const fetchData = async (description) => {
    try {
      setLoading(true); 
      const response = await fetch(`https://vickyacharjee14.pythonanywhere.com/api/search?description=${description}`);
      const json = await response.json();
      // console.log(json);
      setList(json.recommendations || []); 
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  }; 

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    
    if (value.trim()) {
      fetchData(value.trim());
    } else {
      setList([]); 
    }
  };

  return (
    <div> 
    <div className='book-search-page'>
      <div className='search-bar'>
        <h1 className='logo-text'>Book Boluevard</h1>  
        <input
          type="text"
          placeholder="Hi there! What would you like to read today?"
          value={searchTerm}
          onChange={handleInputChange} 
        />
      </div>

      {loading ? (
       <img className="loader-image" src={logo} alt="Logo" />
      ) : (
        <div>
          {list.map((item, index) => (
            <div key={index}> 
              <RecommendationsList data={item}/> 
            </div>
          ))}
        </div>
      )}
      
    </div>
    <footer className="footer">
            @Book Boluevard 2024
    </footer>
    </div>
  );
};

export default BookSearchUp;
