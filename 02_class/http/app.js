const http = require('http')
const https = require('https')

http.request('http://api.divar.ir/v5/posts/QYf6ETs8', (response)=>{
    
    if (response.statusCode === 301) {
        https.request(response.headers.location, (response) => {
            console.log('https response, '+response)
            response.on('data', (data) => {
                console.log(data.toString('utf8'));
            })
        }).end()
    }
    response.on('data', (chunk)=>{
    })
}).end();