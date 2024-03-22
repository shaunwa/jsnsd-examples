const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const interServiceRequest = require('./inter-service-request');

const { ORDERS_SERVICE } = process.env;
const serviceUrl = new URL(ORDERS_SERVICE);

const app = express();
app.use(express.json());

app.post('/orders', async (req, res) => {
    const { restaurantId, itemIds, userAddress } = req.body;
    
    const restaurantRes = await interServiceRequest('restaurant', 'post', `/restaurants/${restaurantId}/orders`, { itemIds });
    const { estimatedTime: prepTime } = restaurantRes.data;

    const deliveryRes = await interServiceRequest('delivery', 'post', `/restaurants/${restaurantId}/orders`, { address: userAddress });
    const { estimatedTime: deliveryTime } = deliveryRes.data;

    res.json(`Thank you for your order! It will be delivered in ${prepTime + deliveryTime} minutes`);
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));