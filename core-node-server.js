const http = require('http');
const url = require('url');
const quotes = require('./quotes.js');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;

    if (pathname === '/time') {
        const dateAndTime = new Date().toISOString();
        res.end(`The current date and time is: ${dateAndTime}`);
    } else if (pathname === '/quote') {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        res.end(JSON.stringify(randomQuote));
    } else {
        res.end(`${pathname} is not a recognized pathname!`);
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});