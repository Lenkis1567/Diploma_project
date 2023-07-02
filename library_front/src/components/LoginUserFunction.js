import {requestPOST} from './BasicFunctions';
import Urls from './Urls'

export async function LoginUserFunction(username, password){
    let userTOKEN=''
    // let divUser = document.querySelector('#user');
    // let divID = document.querySelector('#user_id');
    // let divToken = document.querySelector('#token');
    // let divUserProfileID = document.querySelector('#user_profile_id');

	let data = {
		username,
		password
	}
	console.log('+++++++++',data);

    console.log('------****');
	
	userTOKEN = await requestPOST(Urls.loginUser, data)
	console.log('****', typeof(userTOKEN), userTOKEN);
	if (!('token' in userTOKEN)){
		console.log("Failed to login", userTOKEN.code, userTOKEN.text);
		return false
	} else {
		localStorage.setItem('token', userTOKEN.token);
		localStorage.setItem('user_id', userTOKEN.id);
		localStorage.setItem('user_profile_id', userTOKEN.profile_id);
		localStorage.setItem('user', username)
		console.log("Local storage", userTOKEN, localStorage);

		return true
	}
}