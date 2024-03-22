const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const createApiKeyMiddleware = require('./api-key-middleware');

const { RESTAURANT_SERVICE, RESTAURANT_SERVICE_API_KEY } = process.env;
const serviceUrl = new URL(RESTAURANT_SERVICE);

const app = express();

app.use(createApiKeyMiddleware(RESTAURANT_SERVICE_API_KEY));

app.post('/restaurants/:restaurantId/orders', async (req, res) => {
    res.json({ estimatedTime: 30 });
});

app.get('/restaurants/:restaurantId/address', (req, res) => {
    res.json({ address: '123 Main Street' });
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));