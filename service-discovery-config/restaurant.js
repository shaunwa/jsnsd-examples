const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

app.post('/restaurants/:restaurantId/orders', async (req, res) => {
    res.json({ estimatedTime: 30 });
});

app.get('/restaurants/:restaurantId/address', (req, res) => {
    res.json({ address: '123 Main Street' });
});

const start = async () => {
    const { CONFIG_SERVICE } = process.env;
    const serviceName = 'restaurant';
    const configRes = await axios.get(`${CONFIG_SERVICE}/config/${serviceName}`);
    const serviceUrl = new URL(configRes.data.location);
    app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));
}

start();