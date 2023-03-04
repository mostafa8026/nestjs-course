const http = require('http');
const https = require('https')

console.log('----')
https.request('http://api.divar.ir', (data) => {
    console.log(data.statusCode);
    console.log(data.headers);
}).end();