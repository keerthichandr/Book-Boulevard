import './mybooklist.css'
const MyBookList=({data})=>{
    return(
   
    <div className="book-list">
        <div className="book-item"> 
          <h3>{data.Book}</h3>
          <h3>Author: {data.Author}</h3>
          <h3>DateTime: {data.DateTime}</h3>
        </div>
      </div>
      
    
    )
}
export default MyBookList;




