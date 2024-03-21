require('dotenv').config();
const express = require('express');
const request = require('./request-with-retry')();
const startService = require('./start-service');

const app = express();
app.use(express.json());

app.post('/orders', async (req, res) => {
    const { restaurantId, itemIds, userAddress } = req.body;
    
    const { estimatedTime: prepTime } = await request('restaurant', 'POST', `/restaurants/${restaurantId}/orders`, { itemIds });
    const { estimatedTime: deliveryTime } = await request('delivery', 'POST', `/restaurants/${restaurantId}/orders`, { address: userAddress });

    res.json(`Thank you for your order! It will be delivered in ${prepTime + deliveryTime} minutes`);
});

startService(app, 'orders', 6000);