const http = require('http');

const server = http.createServer((req, res) => {
    console.log('I received a request!');
    res.end('Hello from the Node.js server!');
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});