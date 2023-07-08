import Urls from './Urls'
import {requestGET, requestPOST} from './BasicFunctions';

export async function AddRent(rent_user, start_date, book) {
    let added = false
    let data ={
        'rent_user':rent_user,
        'start_date': start_date,
        'book': book
    }
    let token=localStorage.getItem('token')
    console.log(rent_user, start_date, book, token)
    let res = await requestPOST(Urls.addRent, data, token)
    console.log(res)
}


export async function searchByGoogleId(title, author, age_range, googl_id, img){
    let bookNotFound = false;
  	let searchID = googl_id;
    let res = await requestGET(Urls.searchByGoogleID  + searchID)
    if (typeof res === 'string') {
        return bookNotFound=true;
      } else {
        return bookNotFound=false;
      }
    }