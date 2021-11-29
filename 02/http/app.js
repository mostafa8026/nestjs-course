const http = require('http')
const https = require('https')
const { Buffer } = require('buffer')

const options = {
    host: 'api.divar.ir',
    path: '/v8/web-search/mashhad'
}

http.request('http://api.divar.ir/v8/web-search/mashhad', (response)=>{
    if(response.statusCode == 301) {
        var allChunks = Buffer.from('');
        https.request(response.headers.location, {
            insecureHTTPParser: true
        }, (response)=>{
            response.on('data', (chunk)=>{
                allChunks = Buffer.concat([allChunks, chunk])
            })
            response.on('end', ()=>{
                var json = JSON.parse(allChunks);
                json.suggestion_list.forEach(_item => {
                    console.log(_item);
                })
            })
        }).end();
    }
    response.on('data', (chunk)=>{
        console.log(chunk.toString('utf8'));
    })
}).end();