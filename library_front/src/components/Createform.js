import { getAllAgeRange } from "./GetAllAgeRange";

export async function createForm(title, author, age_range, googl_id, img) {
    let html1_p1 = `<h4 style="padding-left: 10px;"> We don't have this book in the library, please add your book</h4>
              <form id="bookForm">
              <input name="title" value="${title}" readonly>
              <input name="author" value="${author}" readonly>
              <input type="hidden" name="img" value="${img}">
              <input type="hidden" name="googl_id" value="${googl_id}">
              <input type="hidden" name="actual" value="true">`
    let html1_p2 = `<input name="comment" placeholder="Comments">
              <button type="submit" id="sendbook">Add book</button>
            </form>`;
    let age = await getAllAgeRange();
    let select = '<select name="age_range" id="age_range"> <option value="">-- Select an option --</option>'
    for (let a in age) {
      select += `<option value=${age[a]}>${a}</option> `;
    }
    html1_p1 += (select + html1_p2);

    return html1_p1;
  }

  export async function createFormSmall(res) {
    let html = `<h4 style="padding-left: 10px;"> We have such book in the library, but you can add your sample and comment</h4>
    <img src=${res.img} width='90px' style="padding-left: 10px; margin-bottom: 10px">
    <form id='bookForm'>
                  <input name="title" value="${res.title}" readonly>
                  <input name="author" value="${res.author}" readonly>
                  <input type="hidden" name="img" value="${res.img}">
                  <input type="hidden" name="googl_id" value="${res.googl_id}">
                  <input type="hidden" name="actual" value="true">
                  <input type="hidden" name="age_range" value="${res.age_range}">
                  <input name="comment" placeholder="Comments">
                  <button type="submit" id="sendbook">Add book</button>
                </form>`;
    return html;
  }