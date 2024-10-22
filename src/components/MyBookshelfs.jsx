import React, { useEffect, useState } from "react";
import MyBookList from "./MyBookList"; 
import Shimmer from "./Shimmer";
const MyBookshelfs = () => {
const [saveList, setSaveList] = useState([]);

useEffect(() => {
  fetchData();
}, []);

let userId = localStorage.getItem('userId');
  const fetchData = async () => {
    try {
      const response = await fetch('https://vickyacharjee14.pythonanywhere.com/api/mybooks?userid='+userId);
      const json = await response.json(); 
      setSaveList(json.recommendations); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

   if (saveList.length===0) {
     return(<Shimmer/>)
    } 
    return(
    <div className="myBookList-container">
        {/* Check if saveList is an object and has an error */}
        {typeof saveList === 'object' && saveList.error ? (
            <div className="error-message">
                <h3>Your BookShelf is empty.</h3>
            </div>
        ) : (
            // If saveList is an array, map through it
            saveList.map((item, index) => (
                <div key={item.id || item.Book || index}>
                    {/* Check if the item itself contains an error */}
                    {item.error ? (
                         <div className="error-message">
                           <h3>Your BookShelf is empty.</h3>
                         </div>
                    ) : (
                        <MyBookList data={item} />
                    )}
                </div>
            ))
        )}
          <footer className="footer">
                @Book Boluevard 2024
            </footer>
    </div>
);
};

export default MyBookshelfs;