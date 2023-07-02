import React, { useEffect, useState } from 'react';
import { getAllAgeRange } from "./GetAllAgeRange";

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

  const searchBooks = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get('title');
    const author = formData.get('author');
    const ageRange = formData.get('age_range');

    // Perform the search query and update the books state
    // const result = await searchBooksByCriteria(title, author, ageRange);
    setBooks(formData);
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
        <form method="GET" id="search" onSubmit={searchBooks}>
          <input name="title" placeholder="Enter book title" />
          <input name="author" placeholder="Enter author name" />

          <select name="age_range" id="age_range">
            <option value="">-- Select an option --</option>
            {ageOptions.map(([age, value]) => (
              <option key={age} value={value}>
                Age {age}
              </option>
            ))}
          </select>

          <button type="submit">Search a book</button>
        </form>
      </div>

      {/* Display the list of books */}
      <div id="book_list">
        {books.map((book) => (
          <div key={book.id} className="book">
            <h5>{book.title}</h5>
            <h6>{book.author}</h6>
            <img src={book.img} alt="Book cover" />
          </div>
        ))}
      </div>
    </main>
  );
}

export default Search;