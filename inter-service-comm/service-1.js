const express = require('express');
const axios = require('axios');

const app = express();

app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    const urls = [
        `http://localhost:4000/users/${userId}`,
        `http://localhost:5000/users/${userId}/notes`,
    ];

    const [userRes, notesRes] = await Promise.all(
        urls.map(url => axios.get(url))
    );

    const populatedUser = { ...userRes.data, notes: notesRes.data };
    res.json(populatedUser);
});

app.listen(3000, () => console.log(`Server is running on http://localhost:3000`));