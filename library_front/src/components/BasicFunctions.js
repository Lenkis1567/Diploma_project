
export async function requestPOST(url, dataObj={}, token=''){
	let requestData={
		method:'POST',
		headers:{
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dataObj)
	}

	// console.log("request Data in requestPost", requestData);
	
	if (token !== ''){
		requestData.headers.Authorization = ("Token " + token);
	}
	// console.log("request Data in requestPost", requestData);

	try{
		let res = await fetch(url, requestData);
		// console.log(res);
		if (res.ok){
			let resData = await res.json();
			return resData;
		} else {
			console.log('----', res.ok, res.status, res.statusText);
      // throw new Error("The server returned an error");
			return {code:res.status, text:res.statusText, ok:res.ok}
		}
	} catch (error) {
		console.log(error);
    return 'Error connection';
  }
}

// Basic Function Get Request
export async function requestGET(url, options={}){
	const param = new URLSearchParams();
	for (let p in options){
		param.append(p, options[p])
	}
	// console.log('GET запрос:', url + '?' + param);
	try {
		const res = await fetch(url + '?' + param);
		// console.log("results of requestGET", res);
		if (!res.ok){
			return("Error in Get Request(dima)");
		} else {
			let res_Js = res.json();
			return res_Js;
		}
	} catch (error) {
		
	}
}