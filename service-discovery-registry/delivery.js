require('dotenv').config();
const express = require('express');
const request = require('./request-with-retry')();
const startService = require('./start-service');

const app = express();

app.use(express.json());

app.post('/restaurants/:restaurantId/orders', async (req, res) => {
    const { restaurantId } = req.params;
    const { address: userAddress } = req.body;

    const { address: restaurantAddress } = await request('restaurant', 'GET', `/restaurants/${restaurantId}/address`);

    console.log(`A delivery driver will be sent to pick up an order from ${restaurantAddress}`);

    const { estimatedTime } = await request('maps', 'GET', `/estimated-time?start=${restaurantAddress}&end=${userAddress}`);

    res.json({ estimatedTime });
});

startService(app, 'delivery', 5000);