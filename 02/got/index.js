const got = require('got')

async function makeRequest() {
    try {
		const response = await got.get('http://api.divar.ir/v8/web-search/mashhad');
        var json = JSON.parse(response.body);
        json.suggestion_list.forEach(_item => {
            console.log(_item);
        })
	} catch (error) {
		console.log(error.response.body);
	}
}

makeRequest();