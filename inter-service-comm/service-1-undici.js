const express = require('express');
const { request } = require('undici');

const app = express();

app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    const [user, notes] = await Promise.all([
        request(`http://localhost:4000/users/${userId}`).then(({ body }) => body.json()),
        request(`http://localhost:5000/users/${userId}/notes`).then(({ body }) => body.json()),
    ])

    res.json({ ...user, notes });
});

app.listen(3000, () => console.log(`Server is running on http://localhost:3000`));