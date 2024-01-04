const http = require('http');

const server = http.createServer((req, res) => {
    const headers = req.headers;
    console.log(headers);
    res.setHeader('Content-Type', 'text/plain')
    res.end('I got your request!');
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});