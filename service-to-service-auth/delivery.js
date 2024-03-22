const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const createPermissionsMiddleware = require('./create-permissions-middleware');
const interServiceRequest = require('./inter-service-request')('delivery');

const { DELIVERY_SERVICE, ORDERS_TO_DELIVERY_KEY } = process.env;
const serviceUrl = new URL(DELIVERY_SERVICE);

const app = express();

const permissions = {
    [ORDERS_TO_DELIVERY_KEY]: ['dispatch delivery'],
};

app.use(createPermissionsMiddleware(permissions));
app.use(express.json());

app.post('/restaurants/:restaurantId/orders', async (req, res) => {
    if (req.permissions.includes('dispatch delivery')) {
        const { restaurantId } = req.params;
        const { address: userAddress } = req.body;

        const restaurantRes = await interServiceRequest('restaurant', 'get', `/restaurants/${restaurantId}/address`);
        const { address: restaurantAddress } = restaurantRes.data;

        console.log(`A delivery driver will be sent to pick up an order from ${restaurantAddress}`);

        const mapsRes = await interServiceRequest('maps', 'get', `/estimated-time?start=${restaurantAddress}&end=${userAddress}`);
        const { estimatedTime } = mapsRes.data;

        return res.json({ estimatedTime });
    }

    res.sendStatus(401);
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));