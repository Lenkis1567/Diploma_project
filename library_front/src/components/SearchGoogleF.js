// import {requestGET} from './BasicFunctions';
// import Urls from './Urls'


let books = []
async function getDataFromAPI(str_q){
	try{
		let character = await fetch(str_q);
		let character_ob = await character.json();
		return character_ob;
	}catch{
		console.log('Error');
	}
}
  
// Get books with image
export async function search40books(search){
	let setOfBookObjects=[];
	let lengthOfSet = 20;
	let googlePosition = 0;
	let googleStep = 40;
	let q = search.split(' ').join('+');
	console.log(q);
	do {
		let str_q = 'https://www.googleapis.com/books/v1/volumes?q=' + q;
		str_q+= `&startIndex=${googlePosition}`;
		str_q+= `&maxResults=${googleStep}`;

		let response = await getDataFromAPI(str_q)
    
		for (let i of response.items){
			if (setOfBookObjects.length < lengthOfSet){
				try {
					setOfBookObjects.push({
					title:i.volumeInfo.title,
					author:i.volumeInfo.authors.join(', '),
					age_range:'???',
					img:i.volumeInfo.imageLinks.thumbnail,
					googl_id:i.id
				})
				} catch (error) {
					continue;
				}
			} else{
				break
			}
		}
		googlePosition += googleStep;
	} while (setOfBookObjects.length < lengthOfSet)
	return setOfBookObjects;
}

