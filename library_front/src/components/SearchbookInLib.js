async function librarySearchBooks(e){
	e.preventDefault();
	let form=document.forms['search_books'].elements;
	let title = form.title.value
	let author = form.author.value
	let age_range = form.age_range.value
	let params = {
		title,
		author
	}

	let res = await requestGET(urls.searchBookInLibrary, params);
	console.log(res);

	let listDiv = document.querySelector('#search_book_list')
	listDiv.textContent='';
	for (i of res){
		
		let ul = document.createElement('ul');
		for (b in i){
			let li = document.createElement('li');
			li.innerHTML = b +": <b>" + i[b] + '</b>'
			ul.appendChild(li);
		}
		listDiv.appendChild(ul);

		let hr = document.createElement('hr');
		listDiv.appendChild(hr);
	}
}