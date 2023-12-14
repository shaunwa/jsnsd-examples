const express = require('express');

const app = express();

app.use(express.text());
app.use(express.json());

app.post('/users', (req, res) => {
    console.log(req.body);
    res.send('Data received...');
});

app.listen(3000, () => {
    console.log('The Express server is listening on port 3000');
});