const http = require('http')

http.request('http://api.divar.ir/v8/web-search/mashhad', (response)=>{
    response.on('data', (chunk)=>{
        console.log(chunk.toString('utf8'));
    })
}).end();