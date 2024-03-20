const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const setupApp = (services) => {
    app.post('/restaurants/:restaurantId/orders', async (req, res) => {
        const { restaurantId } = req.params;
        const { address: userAddress } = req.body;

        const restaurantRes = await axios.get(`${services['restaurant']}/restaurants/${restaurantId}/address`);
        const { address: restaurantAddress } = restaurantRes.data;

        console.log(`A delivery driver will be sent to pick up an order from ${restaurantAddress}`);

        const mapsRes = await axios.get(`${services['maps']}/estimated-time?start=${restaurantAddress}&end=${userAddress}`);
        const { estimatedTime } = mapsRes.data;

        res.json({ estimatedTime });
    });
}

const servicesNeeded = ['restaurant', 'maps'];

const start = async () => {
    const { CONFIG_SERVICE } = process.env;
    const serviceName = 'delivery';
    const configRes = await axios.get(`${CONFIG_SERVICE}/config/${serviceName}`);

    const serviceResponses = await Promise.all(servicesNeeded.map(
        serviceName => axios.get(`${CONFIG_SERVICE}/config/${serviceName}`).then(res => res.data),
    ));
    
    const services = {};
    servicesNeeded.forEach((serviceName, i) => {
        services[serviceName] = serviceResponses[i].location;
    });

    setupApp(services);

    const serviceUrl = new URL(configRes.data.location);
    app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));
}

start();