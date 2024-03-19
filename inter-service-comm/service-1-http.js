const express = require('express');
const http = require('http');

const app = express();

app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const usersReq = http.request({
        hostname: 'localhost',
        port: 4000,
        path: `/users/${userId}`,
        method: 'GET',
    }, usersRes => {
        let userData = '';

        usersRes.on('data', chunk => {
            userData += chunk;
        });

        usersRes.on('end', () => {
            const notesReq = http.request({
                hostname: 'localhost',
                port: 5000,
                path: `/users/${userId}/notes`,
                method: 'GET',
            }, notesRes => {
                let notesData = '';

                notesRes.on('data', chunk => {
                    notesData += chunk;
                });

                notesRes.on('end', () => {
                    const user = JSON.parse(userData);
                    const notes = JSON.parse(notesData);
                    const populatedUser = { ...user, notes };
                    res.json(populatedUser);
                });
            });

            notesReq.end();
        });
    });

    usersReq.end();
});

app.listen(3000, () => console.log(`Server is running on http://localhost:3000`));