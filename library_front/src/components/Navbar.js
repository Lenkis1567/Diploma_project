import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {requestPOST} from './BasicFunctions';
import { requestGET } from './BasicFunctions';
import Urls from './Urls'

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect((e) => {
      if (token) {
        currentUserInfo()
        console.log("token after refresh", token )
      }
     }, []);

  //  async function currentUserInfo(){
  //       let res_logged = await requestGET(Urls.currentUser)
  //       console.log(res_logged);
  //       if (res_logged.ok) {
  //         const user = await res_logged.json();
  //         setUser(user.username);
  //       } else {
  //         console.log("problem with getting user")
  //       }
    function currentUserInfo(){
      let res_logged = localStorage.user
      console.log(res_logged);
      setUser(res_logged)
    }
 

  async function handleLogout(event){
    event.preventDefault();  
    console.log('***** In logout*****  User logout', token);
    let res = await requestPOST(Urls.logoutUser, {a:'a'}, token); //logout in back
    console.log(typeof(res), res); 
    localStorage.setItem("token", '');
    localStorage.setItem("user", '');
    setToken(''); // Update the token state to reflect the logout
    setUser("")// Update the name of the current user
  };

 

  return (
    <header>
      <p id="profile_name">{user}</p>
      <Link to="/search">Search</Link>
      <Link to="/add">Add</Link>
      <Link to="/">
        <img src="logo.png" width="60px" alt="Logo" />
      </Link>
      <Link to="/about">About us</Link>
      <Link to="/news">News</Link>
      <p id="profile">
        {token ? (
          <>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> / <Link to="/register">Register</Link>
          </>
        )}
      </p>
    </header>
  );
}

export default Navbar;