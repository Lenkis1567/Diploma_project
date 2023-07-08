import Urls from './Urls';

export async function EndRent(id) {
  const token = localStorage.getItem('token');
  const url = `${Urls.endRent}${id}/`;
  console.log(token, url);
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    });

    if (response.ok) {
        console.log(response)
      return true;
    } else {
      throw new Error('An error occurred while updating the rent.');
    }
  } catch (error) {
    throw new Error('An error occurred while updating the rent.');
  }
}
