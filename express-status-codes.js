const express = require('express');

const app = express();

const users = [{
    name: 'Shaun',
    email: 'shaun@gmail.com',
}, {
    name: 'Bob',
    email: 'bob@gmail.com',
}, {
    name: 'Simona',
    email: 'simona@gmail.com',
}];

app.use(express.json());

app.get('/users', (req, res) => {
    res.status(200).send(users);
});

let nextUserId = 0;

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: nextUserId, name, email };
    users.push(newUser);
    nextUserId += 1;
    res.status(201).send(newUser);
});

app.listen(3000, () => {
    console.log('Express server is listening on port 3000');
});