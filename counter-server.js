const express = require('express');

const app = express();

let count = 0;

app.get('/increment', (req, res) => {
    count += 1;
    res.send(`${count}`);
});

app.get('/reset', (req, res) => {
    count = 0;
    res.send(`${count}`);
});

app.listen(3000, () => {
    console.log('Express server is listening on port 3000');
});