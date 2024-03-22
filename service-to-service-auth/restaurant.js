const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const createPermissionsMiddleware = require('./create-permissions-middleware');
const permissionsRequired = require('./permissions-required');

const { RESTAURANT_SERVICE, ORDERS_TO_RESTAURANT_KEY, DELIVERY_TO_RESTAURANT_KEY } = process.env;
const serviceUrl = new URL(RESTAURANT_SERVICE);

const app = express();

const permissions = {
    [ORDERS_TO_RESTAURANT_KEY]: ['place orders'],
    [DELIVERY_TO_RESTAURANT_KEY]: ['get address'],
};

app.use(createPermissionsMiddleware(permissions));

app.post('/restaurants/:restaurantId/orders', permissionsRequired('place orders'), async (req, res) => {
    res.json({ estimatedTime: 30 });
});

app.get('/restaurants/:restaurantId/address', permissionsRequired('get address'), (req, res) => {
    res.json({ address: '123 Main Street' });
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));