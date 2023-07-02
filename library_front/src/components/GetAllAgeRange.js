import Urls from './Urls'
import {requestGET} from './BasicFunctions';

export async function getAllAgeRange(){
	let res = await requestGET(Urls.getAllAgeRange);
	let ageRangeObj ={}
	for (let r of res){
		ageRangeObj[r.range]=r.id;
	}
	console.log(ageRangeObj);
  return ageRangeObj
}