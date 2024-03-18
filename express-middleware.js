const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Received a ${req.method} request on path ${req.url}`);
    next();
});

app.use((req, res, next) => {
    console.log(req.body);
    next();
});

app.get('/hello', (req, res) => {
    res.send('Hello!');
});

app.get('/hello2', (req, res) => {
    res.send('Hello Too!');
});

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});