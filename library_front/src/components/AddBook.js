import Urls from './Urls'
import {requestPOST} from './BasicFunctions';


export async function addBook(e) {
    e.preventDefault();
    let form = document.forms['bookForm'];
    let bookInfo = {
      title: form.elements.title.value,
      author: form.elements.author.value,
      img: form.elements.img.value,
      googl_id: form.elements.googl_id.value,
      actual: true,
      age_range: form.elements.age_range.value
    }
    // let token = localStorage.getItem('token');
    let token = 1001;
    let res = await requestPOST(Urls.addBook, bookInfo, token);
    console.log('Book adding:', res);
    let div = document.querySelector('#googleBooks');
    div.innerHTML = '<h3>Your book added to the library! You can add some more books.</h3>';
    let listDiv = document.querySelector('#bookFormDiv');
    listDiv.innerHTML = '';
    await addBookToLibrary(res, form.elements.comment.value);
    form = document.querySelector('#search');
    form.reset();
  }

  export async function addBookToLibrary(res, comment) {
    let libraryInfo = {
      book: res.id,
    //   user: Number(localStorage.getItem('user_profile_id')),
    user:1000,
      comment: comment,
    }
    console.log("libraryInfo", libraryInfo);
    // let token = localStorage.getItem('token');
    let token = 1001;
    console.log("token", token);
    res = await requestPOST(Urls.addBookToLibrary, libraryInfo, token);
    console.log('Book added to library:', res);
  }
  