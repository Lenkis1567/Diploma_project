import React, { useEffect, useState } from 'react';
import Urls from './Urls';
import { requestGET } from './BasicFunctions';
import { Link } from 'react-router-dom';

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [rents, setRents] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const booksRes = await requestGET(Urls.allBooksInLibrary);
        console.log('Books result', booksRes);
        const filteredBooks = booksRes.filter(
          (book) => Number(book.user.id) === Number(localStorage.getItem('user_profile_id'))
        );
        console.log('Filtered books', filteredBooks);
        if (filteredBooks.length === 0) {
          setBooks([{ Result: 'Not found' }]);
        } else {
          setBooks(filteredBooks);
        }
        const rentsRes = await requestGET(Urls.getAllRents);
        console.log('Rents result', rentsRes);
        const filteredRents = rentsRes.filter(
          (rent) => Number(rent.book.user.id) === Number(localStorage.getItem('user_profile_id'))
        );
        console.log('Filtered rents', filteredRents);
        const activeRents = filteredRents.filter((rent) => rent.end_date === null);
        console.log('activeRents ', activeRents );
        setRents(activeRents);
        const combinedData = filteredBooks.map((book) => {
          const matchingRent = activeRents.find((rent) => rent.book.book.id === book.book.id);
          return {
            ...book,
            rent: matchingRent ? matchingRent : null,
          };
        });
        console.log('Combined Data:', combinedData);
        setCombinedData(combinedData);
      } catch (error) {
        console.log('Error occurred while fetching data:', error);
      }
    }

    fetchData();
  }, []);



  return (
    <>
      <h3>My Books</h3>
      <div id="booklist">
        {combinedData.slice(0, 24).map((combinedItem) => {
          const book = combinedItem.book;
          const rent = combinedItem.rent;
  
          return (
            <div key={book.id} className="newbookList" style={{ width: '200px' }}>
            
              <h4 style={{ color: 'black' }}>Title: {book.title}</h4>
              <p>Author: {book.author}</p>
              {rent ? (
              <div>
                <p>Rented By: {rent.rent_user.first_name} {rent.rent_user.last_name}</p>
                <p>Rented from: {new Date(rent.start_date).toLocaleDateString()}</p>
              </div>
            ) : (
              <p>Free</p>
            )}
              <img src={book.img} width="70px" alt="Book cover" />
            </div>
          );
        })}
      </div>
    </>
  );
      }
export default MyBooks;