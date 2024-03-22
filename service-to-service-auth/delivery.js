const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const createApiKeyMiddleware = require('./api-key-middleware');
const interServiceRequest = require('./inter-service-request');

const { DELIVERY_SERVICE, DELIVERY_SERVICE_API_KEY } = process.env;
const serviceUrl = new URL(DELIVERY_SERVICE);

const app = express();

app.use(createApiKeyMiddleware(DELIVERY_SERVICE_API_KEY));
app.use(express.json());

app.post('/restaurants/:restaurantId/orders', async (req, res) => {
    const { restaurantId } = req.params;
    const { address: userAddress } = req.body;

    const restaurantRes = await interServiceRequest('restaurant', 'get', `/restaurants/${restaurantId}/address`);
    const { address: restaurantAddress } = restaurantRes.data;

    console.log(`A delivery driver will be sent to pick up an order from ${restaurantAddress}`);

    const mapsRes = await interServiceRequest('maps', 'get', `/estimated-time?start=${restaurantAddress}&end=${userAddress}`);
    const { estimatedTime } = mapsRes.data;

    res.json({ estimatedTime });
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));