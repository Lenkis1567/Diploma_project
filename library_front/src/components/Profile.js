import React, { useState, useEffect } from 'react';
import { requestGETtoken } from './BasicFunctions';
import { requestGET, requestPOST, updateMessage } from './BasicFunctions';
import Urls from './Urls';
import { Link } from 'react-router-dom';

function Profile(props) {
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const [id, setUserid] = useState(localStorage.getItem('user_id') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [profileData, setProfileData] = useState(null); // State to store the profile data
  const [messagesAsOwner, setMessagesOwner] = useState([]);
  const [messagesAsRentuser, setMessagesRent] = useState([]);
  const [messageTexts, setMessageTexts] = useState([]);
  const [InfoMessage, setInfoMessage] = useState('');
  const [readStatus, setReadStatus] = useState([]);
//   const [readStatusId, setReadStatusId] = useState();

    useEffect(() => {
        const getProfileData = async () => {
        try {
            const res = await requestGETtoken(Urls.searchProfile, { user_id: id }, token);
            const data = await res;
            setProfileData(data); // Set the profile data in the state
        } catch (error) {
            console.log('Error occurred while fetching profile data:', error);
        }
        };
        getProfileData();
    }, [id, token]); // Add id and token to the dependency array to re-fetch data when they change

    useEffect(() => {
        const getMessagesasOwner = async () => {
          try {
            const res = await requestGETtoken(Urls.searchMessages, { owner: user }, token);
            if (res.length > 0) {
              
              console.log("Res as owner", res)
              const filteredMessagesOwner = res.filter(message => message.sender !== Number(localStorage.getItem('user_profile_id')));
              setMessagesOwner(filteredMessagesOwner);
              console.log("Filtered mes as owner", filteredMessagesOwner)
              setReadStatus((prevReadStatus) => [...prevReadStatus, ...filteredMessagesOwner.map((message) => message.read)]);
              setMessageTexts(new Array(filteredMessagesOwner.length).fill('')); // Initialize messageTexts array with empty strings
            } else {
              console.log('Error occurred while fetching messages:', res);
            }
          } catch (error) {
            console.log('Error occurred while fetching messages:', error);
          }
        };
    
        const getMessagesasRentuser = async () => {
          try {
            const res = await requestGETtoken(Urls.searchMessages, { rent_user: user }, token);
            if (res.length > 0) {
              console.log(res)
              
              const filteredMessagesRent = res.filter(message => message.sender !== Number(localStorage.getItem('user_profile_id')));
              setMessagesRent(filteredMessagesRent);
              console.log("filtered rent", filteredMessagesRent)
              setMessageTexts(new Array(filteredMessagesRent.filteredMessages).fill(''));
              setReadStatus((prevReadStatus) => [
                ...prevReadStatus,
                ...filteredMessagesRent.map((message) => message.read)
              ]);
            } else {
              console.log('Error occurred while fetching messages:', res);
            }
          } catch (error) {
            console.log('Error occurred while fetching messages:', error);
          }
        };
    
        getMessagesasOwner();
        getMessagesasRentuser();
        
      }, [user, token]);

    const sendMessage = async (bookId, userId, owner, index) => {
        setInfoMessage('');
        console.log('In send message:bookid, userid, owner', bookId, userId, owner);
    
        // Check if messageText is not empty
        if (messageTexts[index].trim() !== '') {
            
          const data = {
            text: messageTexts[index],
            book: Number(bookId),
            owner: Number(owner),
            rent_user: Number(userId),
            sender: Number(localStorage.getItem('user_profile_id'))
          };
          const token = localStorage.getItem('token');
          console.log('In sent message: ', data, token);
          const res = await requestPOST(Urls.sendMessagefromBook, data, token);
          console.log('Result', res);
          if (res.code === 401) {
            setInfoMessage(
              <p id="warning">
                You are not logged in, please go to the{' '}
                <a href="http://localhost:3000/login" style={{ color: 'red' }}>
                  Login page
                </a>
              </p>
            );
          } else if (res.id) {
            // Clear the corresponding message text after sending
            const updatedMessageTexts = [...messageTexts];
            updatedMessageTexts[index] = '';
            setMessageTexts(updatedMessageTexts);
            setInfoMessage(<p>The message was sent</p>);
          }
        } else {
          // Display an error message or handle empty input case
          const err = "Please, don't forget to write a message";
          setInfoMessage(err);
          console.log(InfoMessage);
        }
      };
    
      const clearText = () => {
        setMessageTexts(Array(messagesAsOwner.length).fill(''));
      };

      const handleReadStatus = async (index, id) => {
        const updatedReadStatus = [...readStatus];
        updatedReadStatus[index] = true; // Change the read status
        setReadStatus(updatedReadStatus);
        console.log("Message id", id);
      
        try {
          const res = await updateMessage(id); // Assuming updateMessage is an asynchronous function
          console.log(res.data);
        } catch (error) {
          console.log('Error occurred while updating the message:', error);
        }
      };
      
// Sort messages by sender and date
  const sortedMessagesAsOwner = [...messagesAsOwner].sort((a, b) => {
      if (a.book !== b.book) {
        return a.book.localeCompare(b.book); // Sort by book title
      }
      if (a.rent_user !== b.rent_user) {
        return a.rent_user.localeCompare(b.rent_user); // Sort by rent user
      }
      return new Date(a.date_sent) - new Date(b.date_sent); // Sort by date
    });
  
  const sortedMessagesAsRentuser = [...messagesAsRentuser].sort((a, b) => {
    if (a.book !== b.book) {
      return a.book.localeCompare(b.book); // Sort by book title
    }
    if (a.owner !== b.owner) {
      return a.owner.localeCompare(b.owner); // Sort by owner
    }
    return new Date(a.date_sent) - new Date(b.date_sent); // Sort by date
  });
  
    // Group messages by book
    const groupedMessagesAsOwner = sortedMessagesAsOwner.reduce((groups, message) => {
      const { book } = message;
      if (!groups[book]) {
        groups[book] = [];
      }
      groups[book].push(message);
      return groups;
    }, {});
    
    const groupedMessagesAsRentuser = sortedMessagesAsRentuser.reduce((groups, message) => {
      const { book } = message;
      if (!groups[book]) {
        groups[book] = [];
      }
      groups[book].push(message);
      return groups;
    }, {});


      return (
        <div>
          {profileData && (
            <>
              <div style={{ display: 'flex' }}>
                <div id="userinfo" style={{ textAlign: 'left', marginLeft: '40px' }}>
                  <h3>User: {user}</h3>
                  <h4>First Name: {profileData.first_name}</h4>
                  <h4>Last Name: {profileData.last_name}</h4>
                </div>
                <div style={{ marginLeft: 'auto', marginRight: '40px' }}>
                <h3 id='userinfo' style={{ padding: '20px', margin: '0'}}>{InfoMessage}</h3>
                <Link to={{ pathname: '/mybooks'}} style={{ textDecoration: 'none' }}>
                    <h3>My books</h3>
                </Link>
                </div>
              </div>

              <div>
                <h3>Messages as owner:</h3>
              </div>
              <table className="messages-table">
                <thead>
                  <tr>
                    <th className="wide-column">Book Title</th>
                    <th className="narrow-column">Rent User</th>
                    <th className="wide-column">Message</th>
                    <th className="narrow-column">Date Sent</th>
                    <th className="wide-column">Answer</th>
                    <th className="narrow-column">Send</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Render table rows for messages as owner */}
                  {messagesAsOwner.map((message, index) => (
                    <tr key={message.id} className={readStatus[index] ? 'read' : 'unread'}>
                      <td>{message.book}</td>
                      <td>{message.rent_user}</td>
                      <td onClick={() => handleReadStatus(index, message.id)}>
                         <span className={message.read === 0 ? 'unread' : 'read'}>{message.text}</span>
                        </td>
                      <td>
                        {new Date(message.date_sent).toLocaleString([], {
                          dateStyle: 'short',
                          timeStyle: 'short'
                        })}
                      </td>
                      <td>
                        <textarea
                          className="input-answer"
                          rows="3"
                          cols="40"
                          value={messageTexts[index]}
                          onChange={(e) => {
                            const updatedMessageTexts = [...messageTexts];
                            updatedMessageTexts[index] = e.target.value;
                            setMessageTexts(updatedMessageTexts);
                          }}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            sendMessage(
                              message.book_id,
                              message.rent_user_id,
                              localStorage.getItem('user_profile_id'),
                              index
                            )
                          }
                          style={{
                            margin: '10px',
                            display: 'block',
                            backgroundColor: 'black',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px'
                          }}
                        >
                          Send
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
            <h3>Messages as renter:</h3>
        
                <table className="messages-table">
                    <thead>
                        <tr>
                        <th className="wide-column">Book Title</th>
                        <th className="narrow-column">Owner</th>
                        <th className="wide-column">Message</th>
                        <th className="narrow-column">Date Sent</th>
                        <th className="wide-column">Answer</th>
                        <th className="narrow-column">Send</th>
                        </tr>
                    </thead>
                    <tbody>
                         {/* Render table rows for messages as renter */}
                        {messagesAsRentuser.map((message, index) => (
                        <tr key={message.id} className={readStatus[index + messagesAsOwner.length] ? 'read' : 'unread'}>
                            <td>{message.book}</td>
                            <td>{message.owner}</td>
                            <td onClick={() => handleReadStatus(index + messagesAsOwner.length, message.id)}>
                                    <span className={message.read === 0 ? 'unread' : 'read'}>{message.text}</span>
                                </td>
                            <td>
                            {new Date(message.date_sent).toLocaleString([], {
                                dateStyle: 'short',
                                timeStyle: 'short'
                            })}
                            </td>
                            <td>
                            <textarea
                                className="input-answer"
                                rows="3"
                                cols="40"
                                value={messageTexts[index]}
                                onChange={(e) => {
                                const updatedMessageTexts = [...messageTexts];
                                updatedMessageTexts[index] = e.target.value;
                                setMessageTexts(updatedMessageTexts);
                                }}
                            />
                            </td>
                            <td>
                            <button
                                onClick={() =>
                                sendMessage(
                                    message.book_id,
                                    localStorage.getItem('user_profile_id'),
                                    message.owner_id,
                                    index
                                )
                                }
                                style={{
                                margin: '10px',
                                display: 'block',
                                backgroundColor: 'black',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px'
                                }}
                            >
                                Send
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </>
            )}
        </div>


    );
}

export default Profile;