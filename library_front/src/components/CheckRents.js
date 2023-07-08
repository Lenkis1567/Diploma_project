import { requestGET } from './BasicFunctions';
import Urls from './Urls';

export async function CheckRents(owner_id, book_id) {
  try {
    const res = await requestGET(Urls.getAllRents);
    console.log('result', res);
    const filteredRents = res.filter(
      (rent) => Number(owner_id) === Number(localStorage.getItem('user_profile_id'))
    );
    console.log('filteredRents', filteredRents);
    if (filteredRents.length === 0) {
      console.log('BBB')
      return false;
    } else {
      const hasRent = filteredRents.some((rent) => {
        return rent.book.id === book_id && rent.end_date === null;
      });
      console.log('AAA')
      return hasRent;
    }
  } catch (error) {
    console.log('Error occurred while fetching rents:', error);
    return false;
  }
}