import Urls from './Urls'
import {requestGET} from './BasicFunctions';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Indexpage() {
    const [books, setBooks] = useState([]);

    async function getAllBooks(){
        // e.preventDefault();
        let res = await requestGET(Urls.allBooksInLibrary,[]);
        setBooks(res)
    }

    useEffect(() => {
        getAllBooks();
      }, []);
      
    function selectBook(googl_id) {
        console.log(googl_id)
        // window.location.href = `/books/${googl_id}`;
    }

    return (
      <>
     
        <main id="content">
        <div id="jamb">
            <img id="jpic" src='jamb.jpg' alt='jamb'/> 
            <div id="text">
                <p id="slogan">Building community.</p>
                <p id="slogan">Inspiring readers.</p>
                <p id="slogan">Expanding book access.</p>
            </div>
        </div>
        <div className="stickcont">
            <div id="stick">
            </div>
        </div>
        <div id="new">
            <h3>These are the last books we've received:</h3>
            <div id="newbooks">
                {books.slice(0, 24).map((book) => (
                <Link to={`/books/${book.id}`} key={book.id} className="newbookList">
                <h5>Title: {book.book.title}</h5>
                <h6>Author: {book.book.author}</h6>
                <img src={book.book.img} width="70px" alt="Book cover" />
                </Link>
            ))}
            </div>
        </div>

        <div className="stickcont">
            <div id="stick">
            </div>
        </div>
        <div id="search_form">
            <form method="GET" id="search">
                <input className="search"/> 
                <button type="submit" >Search a book</button>
            </form>
        </div>
            <div className="stickcont">
                <div id="stick">
                </div>
            </div>
        <div id="searchRes">
            
        </div>
    </main>
      </>
    );
  }

  export default Indexpage;