const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const createApiKeyMiddleware = require('./api-key-middleware');

const { MAPS_SERVICE, MAPS_SERVICE_API_KEY } = process.env;
const serviceUrl = new URL(MAPS_SERVICE);

const app = express();

app.use(createApiKeyMiddleware(MAPS_SERVICE_API_KEY));

app.get('/estimated-time', (req, res) => {
    const { start, end } = req.query;
    console.log(`Calculating driving time from ${start} to ${end}...`);
    res.json({ estimatedTime: 45 });
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));