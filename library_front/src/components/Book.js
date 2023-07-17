import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestGET, requestPOST } from './BasicFunctions';
import Urls from './Urls'

function Book() {
  const { id } = useParams();
  const [book, setBooks] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [sentMessage, setSentMessage] = useState('')

  useEffect(() => {
    async function getAllBooks() {
      let res = await requestGET(Urls.allBooksInLibrary, []);
      let filteredBook = res.filter(item => item.id === parseInt(id));
      console.log("filtered book", filteredBook)
      setBooks(filteredBook);
    }

    getAllBooks();
  }, [id]);

  const sendMessage = async (text, userId) => {
    setSentMessage('')
    const rent_user=localStorage.getItem('user_profile_id')
    console.log("In send message: ", id, userId, rent_user);
    // Check if owner and person who want the book aren't the same person
      if (Number(userId)===Number(rent_user)){
        setSentMessage(
          <p id='warning'>

            It's your own book!

          </p>
        );
      }
      // Check if messageText is not empty
      else if (messageText.trim() !== '') {
        console.log("Message Text: ", messageText);

        const data= {
          text:messageText,
          book:id,
          owner:userId,
          rent_user:rent_user,
          sender:rent_user
        }

        const token=localStorage.getItem('token')
        console.log("In send message: ", data, token);
        const res = await requestPOST(Urls.sendMessagefromBook, data, token)
        console.log("Result", res)
        if (res.code === 401) {
          setSentMessage(
            <p id='warning'>
              You are not logged in, please go to the{" "}
              <a href="/login" style={{ color: "red" }}>
                Login page
              </a>
            </p>
          );
        } else if (res.id) {
          setMessageText('');
          setSentMessage('The message was sent to the owner');
        } 



      } else {
        // Display an error message or handle empty input case
        const err="Please, don't forget to write a message to the owner"
        setSentMessage(err)
        console.log(sentMessage)
      }
    };


  const clearText = () => {
    setMessageText('');
  };

  return (<> 
    {sentMessage && (
    <h4 className={sentMessage === "Please, don't forget to write a message to the owner" || sentMessage === "You're not logged in, please go to the login page" ? 'error-message' : ''}>
      {sentMessage}
    </h4>)}
    
    <div style={{ marginTop: '50px' }}> 
      
        {book.map(filteredBook => (
          <div key={filteredBook.id}>
            <img src={filteredBook.book.img} alt={filteredBook.book.title} />
            <h3>Title: {filteredBook.book.title}</h3>
            <h4>Author: {filteredBook.book.author}</h4>
            <h4>Owner: {filteredBook.user.first_name} {filteredBook.user.last_name}</h4>


            {/* Text Input */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <textarea
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                placeholder="Enter your message to the owner"
                style={{
                  width: '450px',
                  height: '100px',
                  padding: '10px',
                  margin: '10px 10px',
                  display: 'block',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px'
                }}
                required
              />


              {/* Buttons */}
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <button
                  onClick={() => sendMessage(filteredBook.book.id, filteredBook.user.id)}
                  style={{margin: '10px 10px 10px 0', display: 'block', backgroundColor: 'black', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px',
                  }}
                >
                  Send the message 
                </button>
                {/* Clear Text Button */}
                <button onClick={clearText}
                  style={{margin: '10px 10px 10px 0', display: 'block', backgroundColor: 'orange',color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px',
                  }}          
                >
                  Clear Text
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
        </>
  );
}

export default Book;

