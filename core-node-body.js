const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/users') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const contentType = req.headers['content-type'];

            if (contentType === 'application/json') {
                const parsedBody = JSON.parse(body);
                console.log(parsedBody);
            } else if (contentType === 'text/plain') {
                console.log(body);
            } else if (contentType === 'application/person') {
                const splitBody = body.split('\n');
                const parsedBody = {
                    name: splitBody[0],
                    age: Number(splitBody[1]),
                    hairColor: splitBody[2],
                };
                console.log(parsedBody);
            } else {
                console.log('Unrecognized content type!');
                console.log(body);
            }

            res.end('Data received...');
        });
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});