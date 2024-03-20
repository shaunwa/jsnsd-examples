const express = require('express');

const app = express();

const users = [
    { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: 2, name: "Bob Smith", email: "bob.smith@example.com" },
    { id: 3, name: "Carol White", email: "carol.white@example.com" },
    { id: 4, name: "Dave Brown", email: "dave.brown@example.com" },
    { id: 5, name: "Eve Davis", email: "eve.davis@example.com" },
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:userId', (req, res) => {
    const { userId: userIdRaw } = req.params;
    const userId = Number(userIdRaw);
    const user = users.find(user => user.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'Could not find user for id' });
    }

    res.json(user);
});

app.listen(4000, () => console.log(`Server is running on http://localhost:4000`));