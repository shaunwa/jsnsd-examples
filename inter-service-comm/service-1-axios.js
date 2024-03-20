const express = require('express');
const axios = require('axios');

const app = express();

app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const userRes = await axios.get(`http://localhost:4000/users/${userId}`);
        const notesRes = await axios.get(`http://localhost:5000/users/${userId}/notes`);

        const populatedUser = { ...userRes.data, notes: notesRes.data };
        res.json(populatedUser);
    } catch (e) {
        if (e.response.status === 404) {
            return res.status(404).json(e.response.data.message);
        } else {
            res.sendStatus(500);
        }
    }
});

app.listen(3000, () => console.log(`Server is running on http://localhost:3000`));