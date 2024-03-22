const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const createApiKeyMiddleware = require('./api-key-middleware');

const {
    DELIVERY_SERVICE,
    DELIVERY_SERVICE_API_KEY,
    RESTAURANT_SERVICE,
    RESTAURANT_SERVICE_API_KEY,
    MAPS_SERVICE,
    MAPS_SERVICE_API_KEY,
} = process.env;
const serviceUrl = new URL(DELIVERY_SERVICE);

const app = express();

app.use(createApiKeyMiddleware(DELIVERY_SERVICE_API_KEY));
app.use(express.json());

app.post('/restaurants/:restaurantId/orders', async (req, res) => {
    const { restaurantId } = req.params;
    const { address: userAddress } = req.body;

    const restaurantRes = await axios.get(RESTAURANT_SERVICE + `/restaurants/${restaurantId}/address`, {
        headers: {
            Authorization: RESTAURANT_SERVICE_API_KEY,
        }
    });
    const { address: restaurantAddress } = restaurantRes.data;

    console.log(`A delivery driver will be sent to pick up an order from ${restaurantAddress}`);

    const mapsRes = await axios.get(MAPS_SERVICE + `/estimated-time?start=${restaurantAddress}&end=${userAddress}`, {
        headers: {
            Authorization: MAPS_SERVICE_API_KEY,
        }
    });
    const { estimatedTime } = mapsRes.data;

    res.json({ estimatedTime });
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));