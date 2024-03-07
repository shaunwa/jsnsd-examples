const express = require('express');
const http = require('http');

const app = express();

app.use((req, res) => {
    const requestToServerB = http.request({
        hostname: 'localhost',
        port: 4000,
        path: req.url,
        method: req.method,
        headers: req.headers,
    }, (serverBResponse) => {
        res.writeHead(serverBResponse.statusCode, serverBResponse.headers);
        serverBResponse.pipe(res);
    });

    req.pipe(requestToServerB);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});