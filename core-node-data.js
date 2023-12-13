const http = require('http');

const server = http.createServer((req, res) => {
    const userPathPattern = /^\/users\/(.+)\/comments\/(.+)$/;

    if (userPathPattern.test(req.url)) {
        const match = req.url.match(userPathPattern);
        const userId = match[1];
        const commentId = match[2];
        res.end(`Received a request for comment with id ${commentId} from user with id ${userId}`);
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});