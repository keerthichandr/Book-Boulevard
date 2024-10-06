// src/utils/api.js
export const searchBooks = async (query) => {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
    );
    const data = await response.json();
    return data.docs.map((book) => ({
      key: book.key,
      title: book.title,
      author: book.author_name?.[0],
      cover_url: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
    }));
  };
  
  export const saveToBookshelf = (book) => {
    let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    bookshelf.push(book);
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
  };