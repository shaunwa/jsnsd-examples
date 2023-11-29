const express = require('express');

const app = express();

app.get('/users', (req, res) => {
    res.send({ name: 'Shaun', username: 'shaun' });
});

app.post('/users', (req, res) => {
    res.send('Creating a new user...');
});

app.put('/users', (req, res) => {
    res.send('Updating an entire user...');
});

app.patch('/users', (req, res) => {
    res.send('Updating only a few fields for a user...');
});

app.delete('/users', (req, res) => {
    res.send('Deleting a user...');
});

app.listen(3000, () => console.log('Server is listening on port 3000'));
