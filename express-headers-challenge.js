const express = require('express');

const app = express();

app.get('/', (req, res) => {
    const responseDataType = req.get('Accept');
    if (responseDataType === 'application/json') {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({ message: 'Hello!' }));
    } else if (responseDataType === 'application/xml') {
        res.set('Content-Type', 'application/xml');
        res.send('<message>Hello</message>');
    } else if (responseDataType === 'text/plain') {
        res.set('Content-Type', 'text/plain');
        res.send('Hello!');
    } else {
        res.send('Unsupported "Accept" header value')
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});