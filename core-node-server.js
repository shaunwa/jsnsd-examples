const http = require('http');

const server = http.createServer((req, res) => {
    const dateAndTime = new Date().toISOString();
    res.end(`The current date and time is: ${dateAndTime}`);
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});