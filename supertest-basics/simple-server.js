const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/hello', (req, res) => {
    const contentType = req.get('Accept');
    const { message } = req.body;

    if (contentType === 'application/json') {
        res.json({ a: 1, b: 2, c: 3, message });
    } else {
        res.send('a: 1, b: 2, c: 3, message: ' + message);
    }
});

app.get('/names', (req, res) => {
    const { s } = req.query;

    const names = [
        'Shaun',
        'Jeff',
        'Bob',
        'James',
        'Simona',
    ];

    if (s) {
        const filteredNames = names.filter(name => name.toLowerCase().includes(s.toLowerCase()));
        res.json(filteredNames);
    } else {
        res.json(names);
    }
});

app.post('/greeting', (req, res) => {
    const { isReturningVisitor } = req.cookies;
    if (isReturningVisitor) {
        res.send('Welcome back!');
    } else {
        res.cookie('isReturningVisitor', '1')
        res.send('Welcome to the site!');
    }
});

module.exports = app;