const { URL } = require('url');
require('dotenv').config();
const express = require('express');

const { MAPS_SERVICE } = process.env;
const serviceUrl = new URL(MAPS_SERVICE);

const app = express();

app.get('/estimated-time', (req, res) => {
    const { start, end } = req.query;
    console.log(`Calculating driving time from ${start} to ${end}...`);
    res.json({ estimatedTime: 45 });
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));