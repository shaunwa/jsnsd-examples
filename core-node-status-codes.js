const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(404);
    res.end('I can\'t find anything...');
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});