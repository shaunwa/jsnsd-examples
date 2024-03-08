const express = require('express');
const axios = require('axios');

const app = express();

app.all('*', async (req, res) => {
    await axios.post('http://localhost:4000/logs', {
        message: `App server received a ${req.method} request on path ${req.url}`,
    });

    res.send('Thanks for your input!');
});

app.listen(3000, () => {
    console.log('App server is listening on port 3000');
});