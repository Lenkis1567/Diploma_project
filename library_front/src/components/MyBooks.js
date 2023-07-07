import React, { useEffect, useState } from 'react';
import Urls from './Urls';
import { requestGET } from './BasicFunctions';
import { Link } from 'react-router-dom';

function MyBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function librarySearchBooks() {
      try {
        const res = await requestGET(Urls.allBooksInLibrary);
        console.log('result', res);
        
        const filteredBooks = res.filter((book) => Number(book.user.id) === Number(localStorage.getItem('user_profile_id')));
        
        console.log('filteredBooks', filteredBooks);
        if (filteredBooks.length === 0) {
          setBooks([{ Result: 'Not found' }]);
        } else {
          setBooks(filteredBooks);
        }
      } catch (error) {
        console.log('Error occurred while fetching books:', error);
      }
    }

    librarySearchBooks();
  }, []);

  return (
        <> 
        <h3>My Books</h3>
            <div id="booklist">
                {books.slice(0, 24).map((book) => (
                <Link to={`/books/${book.id}`} key={book.id} className="newbookList">
                <p>Title: {book.book.title}</p>
                <p>Author: {book.book.author}</p>
                <img src={book.book.img} width="70px" alt="Book cover" />
                </Link>
            ))}
            </div>



    
    </>
  );
}

export default MyBooks;