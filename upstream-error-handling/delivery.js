const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const requestWithRetry = require('./auto-retry');

const { DELIVERY_SERVICE, RESTAURANT_SERVICE, MAPS_SERVICE } = process.env;
const serviceUrl = new URL(DELIVERY_SERVICE);

const app = express();

app.use(express.json());

app.post('/restaurants/:restaurantId/orders', async (req, res) => {
    const { restaurantId } = req.params;
    const { address: userAddress } = req.body;

    const restaurantRes = await axios.get(RESTAURANT_SERVICE + `/restaurants/${restaurantId}/address`);
    const { address: restaurantAddress } = restaurantRes.data;

    console.log(`A delivery driver will be sent to pick up an order from ${restaurantAddress}`);

    try {
        const mapsRes = await requestWithRetry('get', MAPS_SERVICE + `/estimated-time?start=${restaurantAddress}&end=${userAddress}`);
        const { estimatedTime } = mapsRes.data;

        res.json({ estimatedTime });
    } catch (err) {
        if (err.code === 'ECONNREFUSED') {
            return res.status(200).json({ failures: [{ name: 'maps', code: 500 }] });
        }

        console.error(err);
        res.sendStatus(500);
    }
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));