const Urls = {
	createUser:				'http://127.0.0.1:8000/api/v1/auth/users/',
	loginUser:				'http://127.0.0.1:8000/api/v1/auth/authenticate/',
	logoutUser:				'http://127.0.0.1:8000/api/v1/auth/token/logout/',
	currentUser:			'http://127.0.0.1:8000/api/v1/auth/users/me/',
	createProfile:			'http://127.0.0.1:8000/api/v1/profile',
	searchProfile: 			'http://127.0.0.1:8000/api/v1/profile/search',
	getAllBooks:			'http://127.0.0.1:8000/api/v1/book/',
	addBook:				'http://127.0.0.1:8000/api/v1/book/',
	getAllAgeRange:			'http://127.0.0.1:8000/api/v1/age/',
	searchByGoogleID:		'http://127.0.0.1:8000/api/v1/ggl/',
	addBookToLibrary:		'http://127.0.0.1:8000/api/v1/library/', 
	allBooksInLibrary:		'http://127.0.0.1:8000/api/v1/library/list', 
	searchBookInLibrary:	'http://127.0.0.1:8000/api/v1/library/search/',
	sendMessagefromBook:	'http://127.0.0.1:8000/api/v1/messages',
	searchMessages:			'http://127.0.0.1:8000/api/v1/messages/search',
	listMessages:			'http://127.0.0.1:8000/api/v1/messages/list',
	changeStatusMessage: 	'http://127.0.0.1:8000/api/v1/messages/change'

}
export default Urls