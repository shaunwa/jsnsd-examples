const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const { ORDERS_SERVICE, RESTAURANT_SERVICE, DELIVERY_SERVICE } = process.env;
const serviceUrl = new URL(ORDERS_SERVICE);

const app = express();
app.use(express.json());

app.post('/orders', async (req, res) => {
    const { restaurantId, itemIds, userAddress } = req.body;
    
    const restaurantRes = await axios.post(RESTAURANT_SERVICE + `/restaurants/${restaurantId}/orders`, { itemIds });
    const { estimatedTime: prepTime } = restaurantRes.data;

    const deliveryRes = await axios.post(DELIVERY_SERVICE + `/restaurants/${restaurantId}/orders`, { address: userAddress });
    const { failures, estimatedTime: deliveryTime } = deliveryRes.data;

    if (failures.length > 0) {
        if (failures.some(failure => failure.name === 'driver')) {
            return res.json(`Hang tight! Something is up with our systems, but we've placed an order with the restaurant`);
        }

        if (failures.some(failure => failure.name === 'maps')) {
            return res.json(`Thank you for your order! We were unable to get an estimated delivery time, we'll get back to you!`);
        }
    }

    res.json(`Thank you for your order! It will be delivered in ${prepTime + deliveryTime} minutes`);
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));