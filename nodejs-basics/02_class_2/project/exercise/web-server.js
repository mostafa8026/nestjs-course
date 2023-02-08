const http = require('http');
const { getCurrentTime } = require('../utils/delay');
const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
     res.write('<h1>Welcome</h1>');
     res.end();
  } else if (req.url === '/api/current-time') {
    res.write(`<h1>time: ${await getCurrentTime()}</h1>`);
     res.end();
  }
});
server.listen(3000);