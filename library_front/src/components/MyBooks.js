import React, { useEffect, useState } from 'react';
import Urls from './Urls';
import { requestGET } from './BasicFunctions';
import { Link } from 'react-router-dom';

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [rents, setRents] = useState([]);

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
    async function SearchRents() {
        try {
          const res = await requestGET(Urls.getAllRents);
          console.log('result', res);
          const filteredRents = res.filter((rent) => Number(rent.book.user.id) === Number(localStorage.getItem('user_profile_id')));
          console.log('filteredRents', filteredRents);
          if (filteredRents.length === 0) {
            setRents([{ Result: 'Not found' }]);
          } else {
            setRents(filteredRents);
          }
        } catch (error) {
          console.log('Error occurred while fetching rents:', error);
        }
      }

    librarySearchBooks();
    SearchRents()
  }, []);

  return (
    <>
      <h3>My Books</h3>
      <div id="booklist">
        {books.slice(0, 24).map((book) => {
          const matchingRent = rents.find((rent) => Number(rent.book.book.id) === Number(book.book.id));
          return (
            <Link to={`/books/${book.id}`} key={book.id} className="newbookList" style={{width:'200px'}}>
              <p>Title: {book.book.title}</p>
              <p>Author: {book.book.author}</p>
              {matchingRent ? (
                <div>
                    <p>Rented By: {matchingRent.rent_user.first_name} {matchingRent.rent_user.last_name}</p>
                    <p>Rented from: {new Date(matchingRent.start_date).toLocaleDateString()}</p>
                </div>
              ) : (
                <p>Free</p>
              )}
              <img src={book.book.img} width="70px" alt="Book cover" />
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default MyBooks;