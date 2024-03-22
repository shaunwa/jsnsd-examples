const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const createPermissionsMiddleware = require('./create-permissions-middleware');

const { RESTAURANT_SERVICE, ORDERS_TO_RESTAURANT_KEY, DELIVERY_TO_RESTAURANT_KEY } = process.env;
const serviceUrl = new URL(RESTAURANT_SERVICE);

const app = express();

const permissions = {
    [ORDERS_TO_RESTAURANT_KEY]: ['place orders'],
    [DELIVERY_TO_RESTAURANT_KEY]: ['get address'],
};

app.use(createPermissionsMiddleware(permissions));

app.post('/restaurants/:restaurantId/orders', async (req, res) => {
    if (req.permissions.includes('place orders')) {
        return res.json({ estimatedTime: 30 });
    }

    return res.sendStatus(401);
});

app.get('/restaurants/:restaurantId/address', (req, res) => {
    if (req.permissions.includes('get address')) {
        return res.json({ address: '123 Main Street' });
    }

    return res.sendStatus(401);
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));