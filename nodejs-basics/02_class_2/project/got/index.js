const got = require('got');
//console.log(got);

async function run() {
    const ret = await got.get('http://api.divar.ir/v8/web-search/mashhad');
    console.log(ret.body);
}

run();