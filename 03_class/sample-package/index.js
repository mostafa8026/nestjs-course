const got = require('got')

async function start() {
    try {
		const response = await got('http://api.divar.ir/v5/posts/QYf6ETs8');
		console.log(response.body);
	} catch (error) {
		console.log(error.response.body);
	}
}

start()