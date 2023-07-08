import React, { useEffect, useState } from 'react';
import { getAllAgeRange } from "./GetAllAgeRange";
import Urls from './Urls'
import {requestGET} from './BasicFunctions';
import { Link } from 'react-router-dom';


function Search() {
  const [ageOptions, setAgeOptions] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAgeRange = async () => {
      const ageRange = await getAllAgeRange();
      setAgeOptions(Object.entries(ageRange));
    };

    fetchAgeRange();
  }, []);

  async function librarySearchBooks(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get('title');
    const author = formData.get('author');
    const ageRange = formData.get('age_range');
    console.log("formData: ", title, author, ageRange);

    let params = {
      title,
      author,
      ageRange
    }

    let res = await requestGET(Urls.searchBookInLibrary, params);
    console.log("Result", res);
    if (res.length===0) setBooks([{ Result: 'Not found' }]);
    else {setBooks(res)}
  };


  return (
    <main id="content">
      <div id="searchp">
        <img id="searchpic" src="searchs.jpg" alt="" />
      </div>

      <div className="stickcont">
        <div id="stick"></div>
      </div>

      <div className="stickcont">
        <h3>Which books would you like to find?</h3>
      </div>

      <div id="search_form_add">
        <form method="GET" id="search" onSubmit={librarySearchBooks}>
          <input name="title" placeholder="Enter book title" style={{ height: '26px' }} />
          <input name="author" placeholder="Enter author name" style={{ height: '26px' }}/>

          <select name="age_range" id="age_range" style={{ height: '33px' }}>
            <option value="">-- Select an option --</option>
            {ageOptions.map(([age, value]) => (
              <option key={age} value={value}>
                Age {age}
              </option>
            ))}
          </select>

          <button type="submit" style={{
              margin: '10px',
              backgroundColor: 'black',
              color: 'white',
              padding: '9px 20px',
              border: 'none',
              borderRadius: '5px',
              height: '33px'
            }}>Search a book
          </button>
        </form>
      </div>

      {/* Display the list of books */}
      <div id="booklist">
      {books[0] && books[0].Result === 'Not found' ? (
          <div id="searchresults">
            <h5 id='notfound'>Book not found, try some other books</h5>
          </div>
        ) : (
          books.map((book) => (
            
            <Link to={`/books/${book.id}`} key={book.id} className="newbookList">
              <h5>{book.titel}</h5>
              <h6>{book.author}</h6>
              <img src={book.img} alt="" />
            </Link>
          ))
        )}
      </div>
    </main>
  );

}

export default Search;