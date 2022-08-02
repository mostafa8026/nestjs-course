// use got 11
const got = require('got')

async function run() {
    const response = await got.get('http://google.com');
    console.log(response.body)
}

run()