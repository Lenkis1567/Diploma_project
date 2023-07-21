export async function Usersinfo(){
	
	// let token=localStorage.getItem('token');
    let token='13a60769a5d6b1ebdee9e50a0b6c55bbf0d57219'
	// console.log('Token in userinfo', token);
	const reqData ={
		method:'GET',
		headers: {
			'Content-type' : 'application/json',
			'Authorization' : 'Token ' + token
		}
	}
	let res = await fetch(createUser, reqData)
	let resJS = await res.json();
	console.log("USERINFO", res, resJS)
    return resJS
}