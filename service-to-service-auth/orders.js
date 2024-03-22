const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const {
    ORDERS_SERVICE,
    RESTAURANT_SERVICE,
    RESTAURANT_SERVICE_API_KEY,
    DELIVERY_SERVICE,
    DELIVERY_SERVICE_API_KEY,
} = process.env;
const serviceUrl = new URL(ORDERS_SERVICE);

const app = express();
app.use(express.json());

app.post('/orders', async (req, res) => {
    const { restaurantId, itemIds, userAddress } = req.body;
    
    const restaurantRes = await axios.post(RESTAURANT_SERVICE + `/restaurants/${restaurantId}/orders`, { itemIds }, {
        headers: {
            Authorization: RESTAURANT_SERVICE_API_KEY,
        }
    });
    const { estimatedTime: prepTime } = restaurantRes.data;

    const deliveryRes = await axios.post(DELIVERY_SERVICE + `/restaurants/${restaurantId}/orders`, { address: userAddress }, {
        headers: {
            Authorization: DELIVERY_SERVICE_API_KEY,
        }
    });
    const { estimatedTime: deliveryTime } = deliveryRes.data;

    res.json(`Thank you for your order! It will be delivered in ${prepTime + deliveryTime} minutes`);
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));