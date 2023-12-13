const express = require('express');

const app = express();

app.get('/users/:userId', (req, res) => {
    res.send(`Received a request for user with id: ${req.params.userId}`);
});

app.get('/users/:userId/comments/:commentId', (req, res) => {
    res.send(`Received a request for the comment with id ${req.params.commentId} from user with id ${req.params.userId}`);
});

app.listen(3000, () => {
    console.log('The Express server is listening on port 3000');
});