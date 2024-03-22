const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const createPermissionsMiddleware = require('./create-permissions-middleware');

const { MAPS_SERVICE, DELIVERY_TO_MAPS_KEY } = process.env;
const serviceUrl = new URL(MAPS_SERVICE);

const app = express();

const permissions = {
    [DELIVERY_TO_MAPS_KEY]: ['get estimate'],
};

app.use(createPermissionsMiddleware(permissions));

app.get('/estimated-time', (req, res) => {
    if (req.permissions.includes('get estimate')) {
        const { start, end } = req.query;
        console.log(`Calculating driving time from ${start} to ${end}...`);
        return res.json({ estimatedTime: 45 });
    }

    res.sendStatus(401);
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));