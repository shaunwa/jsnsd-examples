const express = require('express');
const quotes = require('./quotes.js');

const app = express();

app.get('/time', (req, res) => {
    const dateAndTime = new Date().toISOString();
    res.send(`The current date and time is: ${dateAndTime}`);
});

app.get('/quote', (req, res) => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.send(randomQuote);
});

app.listen(3001, () => {
    console.log('Express server is listening on port 3001');
});