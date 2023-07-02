import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestGET } from './BasicFunctions';

function Book() {
  const { id } = useParams();
  const [book, setBooks] = useState([]);

  useEffect(() => {
    async function getAllBooks() {
      let res = await requestGET('http://127.0.0.1:8000/api/v1/library/list', []);
      let filteredBook = res.filter(item => item.id === parseInt(id));
      // let owners = res.filter(item => item.)
      setBooks(filteredBook);
    }

    getAllBooks();
  }, [id]);

  const sendMessage = (title, userId) => {
    console.log(title, userId);
  };

  return (
    <div style={{ marginTop: '50px' }}> 
        {book.map(filteredBook => (
          <div key={filteredBook.id}>
            <img src={filteredBook.book.img} alt={filteredBook.book.title} />
            <h3>Title: {filteredBook.book.title}</h3>
            <h4>Author: {filteredBook.book.author}</h4>
            <h4>Owner: {filteredBook.user.first_name} {filteredBook.user.last_name}</h4>
            <button onClick={() => sendMessage(filteredBook.book.title, filteredBook.user.id)}>Send a message to the owner</button>
          </div>
        ))}
    </div>
  );
}

export default Book;