const BASE_URL = process.env.REACT_APP_BASE_URL

const Urls = {
	createUser:				BASE_URL + '/api/v1/auth/users/',
	loginUser:				BASE_URL + '/api/v1/auth/authenticate/',
	logoutUser:				BASE_URL + '/api/v1/auth/token/logout/',
	currentUser:			BASE_URL + '/api/v1/auth/users/me/',
	createProfile:			BASE_URL + '/api/v1/profile',
	searchProfile: 			BASE_URL + '/api/v1/profile/search',
	getAllBooks:			'https://libraryback-w7jx.onrender.com/api/v1/book/',
	addBook:				BASE_URL + '/api/v1/book/',
	getAllAgeRange:			BASE_URL + '/api/v1/age/',
	searchByGoogleID:		BASE_URL + '/api/v1/ggl/',
	addBookToLibrary:		BASE_URL + '/api/v1/library/', 
	allBooksInLibrary:		BASE_URL + '/api/v1/library/list', 
	searchBookInLibrary:	BASE_URL + '/api/v1/library/search/',
	sendMessagefromBook:	BASE_URL + '/api/v1/messages',
	searchMessages:			BASE_URL + '/api/v1/messages/search',
	listMessages:			BASE_URL + '/api/v1/messages/list',
	changeStatusMessage: 	BASE_URL + '/api/v1/messages/change',
	getAllRents:			BASE_URL + '/api/v1/rents/list',
	addRent:				BASE_URL + '/api/v1/rents',
	endRent: 				BASE_URL + '/api/v1/rents/change/'

}
export default Urls