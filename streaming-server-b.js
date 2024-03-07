const express = require('express');

const app = express();

app.all('*', (req, res) => {
    console.log(`Received a request: ${req.method} ${req.url}`);
    res.send(`Server B received a request: ${req.method} ${req.url}`);
});

app.listen(4000, () => {
    console.log('Server is listening on port 4000');
});