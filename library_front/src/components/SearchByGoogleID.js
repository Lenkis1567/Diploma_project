import Urls from './Urls'
import {requestGET} from './BasicFunctions';

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