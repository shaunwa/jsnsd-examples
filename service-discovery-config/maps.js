const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

app.get('/estimated-time', (req, res) => {
    const { start, end } = req.query;
    console.log(`Calculating driving time from ${start} to ${end}...`);
    res.json({ estimatedTime: 45 });
});

const start = async () => {
    const { CONFIG_SERVICE } = process.env;
    const serviceName = 'maps';
    const configRes = await axios.get(`${CONFIG_SERVICE}/config/${serviceName}`);
    const serviceUrl = new URL(configRes.data.location);
    app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));
}

start();