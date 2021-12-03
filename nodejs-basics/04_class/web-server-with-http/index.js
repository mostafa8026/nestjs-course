const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello world!')
        res.end();
    }

    if(req.url === '/api/courses') {
        res.write(
            JSON.stringify([{
                id: 1,
                name: 'Node.js basic'
            },
            {
                id: 2,
                name: 'OOP basics'
            }])
        );
        res.end();
    }
});

server.listen(3000);

console.log('Start listening on port 3000')