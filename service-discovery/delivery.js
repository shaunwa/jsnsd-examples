const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const { DELIVERY_SERVICE, RESTAURANT_SERVICE } = process.env;
const serviceUrl = new URL(DELIVERY_SERVICE);

const app = express();

app.post('/restaurants/:restaurantId/orders', async (req, res) => {
    const { restaurantId } = req.params;

    const restaurantRes = await axios.get(RESTAURANT_SERVICE + `/restaurants/${restaurantId}/address`);
    const { address } = restaurantRes.data;

    console.log(`A delivery driver will be sent to pick up an order from ${address}`);

    res.json({ estimatedTime: 15 });
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));