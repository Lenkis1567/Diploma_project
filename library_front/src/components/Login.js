import {LoginUserFunction} from "./LoginUserFunction";
import React, { useState } from 'react';

function Login() {
    const a= "Please, login to lend or borrow a book"
    const [loginGood, setIsLoginGood] = useState(a);
    const [error, setError] = useState(false);

    async function eventLoginUserFunction(e){
        console.log("Тест в эвенте");
        let username=e.target.elements.login.value;
        let password=e.target.elements.password.value;
    
        console.log('username, password', username, password);
    
        let res = await LoginUserFunction(username, password);
        if (res) {
            window.location.href = '/'
        }
        else {
            console.log("No such user")
            setIsLoginGood("Invalid login or password, try one more time")
            setError(true);
        }

    }

    return (
        <main id="content">
            <div id="searchp">
                <img id="searchpic" src='login.jpeg' alt='login'/> 
            </div>
           
            <div className="stickcont">
                <div id="stick">
                </div>
            </div>    
            <div className="stickcont">
                 <h3 className={error ? "error-message" : ""}>{loginGood}</h3>
            </div>
            <div id="register_form">
            <form  id="register" onSubmit={(e)=>{
                        e.preventDefault()
                        eventLoginUserFunction(e);
                        }}>
                    <label htmlFor="login">Your login:</label>
                    <input type="login" className="login" id="login" placeholder='login'/>
                    <br/>
                    <label htmlFor="password">Your password:</label>
                    <input type="password" className="password" id="password" placeholder='password' />
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>

        </main>
        
    )
    }


    export default Login;