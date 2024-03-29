const { URL } = require('url');
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const request = require('./request-with-retry');

const app = express();
app.use(express.json());

const setupApp = (services) => {
    app.post('/orders', async (req, res) => {
        const { restaurantId, itemIds, userAddress } = req.body;
        
        const { estimatedTime: prepTime } = await request(services, 'restaurant', 'POST', `/restaurants/${restaurantId}/orders`, { itemIds });
        const { estimatedTime: deliveryTime } = await request(services, 'delivery', 'POST', `/restaurants/${restaurantId}/orders`, { address: userAddress });

        res.json(`Thank you for your order! It will be delivered in ${prepTime + deliveryTime} minutes`);
    });
}

const servicesNeeded = ['restaurant', 'delivery'];

const start = async () => {
    const { CONFIG_SERVICE } = process.env;
    const serviceName = 'orders'
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