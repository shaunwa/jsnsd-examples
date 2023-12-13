const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const { a = '0', b = '0' } = url.parse(req.url, true).query;

    res.end(`${a} + ${b} = ${Number(a) + Number(b)}`)
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});