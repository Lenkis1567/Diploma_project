import {requestPOST} from './BasicFunctions';
import React, { useState, useEffect } from 'react';
import {search40books} from './SearchGoogleF';
import {getAllAgeRange} from './GetAllAgeRange';
import {searchByGoogleId} from './SearchByGoogleID';
import { createForm } from './Createform';
import { createFormSmall } from './Createform';
import Urls from './Urls'


function Add() {
    const [googlebooks, setGoogleBooks] = useState([]);
    const [bookselected, setSelectedbook] = useState({})
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [msg, setMessage] = useState("");
    const [form, setForm] = useState('');
  
    async function searchGoogle(event) {
      event.preventDefault();
      const searchInput = event.target.elements.search.value;
      const results = await search40books(searchInput);
      console.log (results)
      setGoogleBooks(results); 
      setMessage('')
    };

   const selectBook = async(index)=> {
        const selectedBook = googlebooks[index];
        console.log('Selected book:', selectedBook.title, selectedBook.author, selectedBook.img, selectedBook.googl_id, selectedBook.age_range);
        // setSelectedbook(selectedBook);
        console.log("newstate of selected book", selectedBook, "bookselected.googl_id", selectedBook.googl_id)
        

        const result = await searchByGoogleId(selectedBook.title, selectedBook.author, selectedBook.age_range, selectedBook.googl_id, selectedBook.img)
        console.log("Results of search in books", result)
        if (!result) {
            const formHtml = await createFormSmall(selectedBook);
            document.getElementById('bookFormDiv').innerHTML = formHtml;
          } else {
            const formHtml = await createForm(selectedBook.title, selectedBook.author, selectedBook.age_range, selectedBook.googl_id, selectedBook.img);
            document.getElementById('bookFormDiv').innerHTML = formHtml;
          }

    }

    async function addBook(e) {
            e.preventDefault();
              const form = e.target;
              let bookInfo = {
                title: form.elements.title.value, 
                author: form.elements.author.value, 
                img: form.elements.img.value, 
                googl_id: form.elements.googl_id.value, 
                actual: true,
                age_range: form.elements.age_range.value, 
              }
              

            let res = await requestPOST(Urls.addBook, bookInfo, token);
            console.log('Book added to books:', res);
            await addBookToLibrary(res, form.elements.comment.value);
          }
        
            async function addBookToLibrary(res, comment) {
              let userProfileid = localStorage.getItem('user_profile_id')
              console.log("USERRR", userProfileid);
              let libraryInfo = {
                book: res.id,
                user: Number(userProfileid),
                comment: comment,
              }
              console.log("libraryInfo", libraryInfo);
              res = await requestPOST(Urls.addBookToLibrary, libraryInfo, token);
              console.log('Book added to library:', res, res.code);
              if (res.code ===401) {
                setMessage(
                  <p id='warning'>
                    You are not logged in, please go to the{" "}
                    <a href="http://localhost:3000/login" style={{ color: "red" }}>
                      Login page
                    </a>
                  </p>
                );
                } else if(res.code ===400) {
                  setMessage(
                    <p id='warning'>
                      Please, choose age and add your comments about the book
  
                    </p>
                  );
                }else if (res.addDate) {
                setMessage(
                  <p id='confirm'>
                    You've added the book to our library, you can add some more 

                  </p>
                );
              } 
            }



    return (
        <main id="content">
            <div id="jamb">
                <img id="addpic" src='add.jpeg' alt='add'/> 
                <div id="text">
                    <p id="slogan">Add the books</p>
                    <p id="slogan">You are ready to share </p>
                    <p id="slogan">Books that are worth sharing</p>
                </div>
            </div>
            <div className="stickcont">
                <div id="stick">
                </div>
            </div> 

            <div id="search_form_add">
                <h3>Type a title or author of the book to choose the right version and get a full info about the book you'd like to add:
                </h3>
                <form method="GET" id="search" onSubmit={searchGoogle}>
                    <input id="searchInput" className="search" name='search' required/>
                    <button type="submit">Search a book</button>
                </form>
                <div id="bookFormDiv" onSubmit={addBook}>
                  {msg}
                </div>
                <div id="googleBooks">
                {googlebooks.map((book, index) => (
                    <div
                    className="book"
                    id={`book${index}`}
                    key={index}
                    onClick={() => selectBook(index)}
                    >
                    <h5>{book.title}</h5>
                    <h6>{book.author}</h6>
                    <img src={book.img} width="40px" alt={book.title} />
                    </div>
                ))}
                </div>
                <div id="googleBooks">
                </div>
            </div>
            
    </main>)
    }


    export default Add;