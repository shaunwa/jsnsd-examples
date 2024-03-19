const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();

app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    const [user, notes] = await Promise.all([
        fetch(`http://localhost:4000/users/${userId}`).then(res => res.json()),
        fetch(`http://localhost:5000/users/${userId}/notes`).then(res => res.json()),
    ]);

    const populatedUser = { ...user, notes };

    res.json(populatedUser);
});

app.listen(3000, () => console.log(`Server is running on http://localhost:3000`));