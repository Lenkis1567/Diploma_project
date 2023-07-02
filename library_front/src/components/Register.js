// import { requestGET } from './BasicFunctions';
import { requestPOST } from './BasicFunctions';
import Urls from './Urls'
import {LoginUserFunction} from "./LoginUserFunction";
import { Usersinfo } from './Usersinfo';

function Register() {

    const addUserFunction = async (e) => {
        e.preventDefault();
        
        let username = e.target.login.value;
        let password = e.target.password.value;
        let Email = e.target.email.value;
        
        let data = {
            username,
            password,
            Email
        }

        let userExist = await Usersinfo()
        let resp = await requestPOST(Urls.createUser, data);
        console.log ('After creating a user', resp);
        console.log("USEREXISTS", userExist)

            // If the user is created, log in with his login
        if (!('ok' in resp)){ 
            let log_res = await LoginUserFunction(username, password);
    
            // If the user is logged in, create his profile


            if (log_res){            
                const profileFields = {
                Email: e.target.email.value,
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value,
                phone: e.target.phone.value,
                city: e.target.city.value,
                address: e.target.address.value,
                geo_latitudes: 100,
                geo_longitude: 111
                }

                // data['geo_latitudes'] = data['geo_latitudes'] == '' ? 0: data['geo_latitudes']
                // data['geo_longitude'] = data['geo_longitude'] == '' ? 0: data['geo_longitude']
                    
                resp = await requestPOST(Urls.createProfile, profileFields, localStorage.getItem('token'))
                console.log('After creating a profile',resp);
                if (resp.ok){
                    localStorage.setItem('user_profile_id', resp.user_profile_id);
                    
                }
            }
        }
    
    }

    return (
        <main id="content">
            <div id="searchp">
                <img id="searchpic" src="login.jpeg" alt="login" />
            </div>

            <div className="stickcont">
                <div id="stick"></div>
            </div>
            <div className="stickcont">
                <h3>Please, register to lend or borrow a book</h3>
            </div>
            <div id="new_profile">
            <form className="new_profile" onSubmit={addUserFunction}>
                <label className="form-label" htmlFor="login">Login: *</label>
                <input className="form-input" type="text" name="login" id="login" placeholder="Create login" required />
                <br />
                <label className="form-label" htmlFor="password">Password: *</label>
                <input className="form-input" type="password" name="password" id="password" placeholder="Create a password" required />
                <br />
                <label className="form-label" htmlFor="first_name">First name: *</label>
                <input className="form-input" type="text" name="first_name" id="first_name" placeholder="Enter first name" required />
                <br />
                <label className="form-label" htmlFor="last_name">Last name: *</label>
                <input className="form-input" type="text" name="last_name" id="last_name" placeholder="Enter last name" required />
                <br />
                <label className="form-label" htmlFor="email">Email: *</label>
                <input className="form-input" type="email" name="email" id="email" placeholder="Enter email" required />
                <br />
                <label className="form-label" htmlFor="phone">Phone: *</label>
                <input className="form-input" type="tel" name="phone" id="phone" placeholder="Enter phone number" required />
                <br />
                <label className="form-label" htmlFor="city">City: *</label>
                <input className="form-input" type="text" name="city" id="city" placeholder="Enter city" required />
                <br />
                <label className="form-label" htmlFor="address">Address: *</label>
                <input className="form-input" type="text" name="address" id="address" placeholder="Enter address" required />
                <br />
                   
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Register;