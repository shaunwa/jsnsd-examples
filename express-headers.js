const express = require('express');

const app = express();

app.get('/', (req, res) => {
    const contentType = req.get('Content-Type');
    console.log(`The content type is ${contentType}`);
    res.set('Content-Type', 'text/plain');
    res.removeHeader('X-Powered-By')
    res.send('I have received your request');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});