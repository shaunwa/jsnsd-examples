const { URL } = require('url');
require('dotenv').config();
const express = require('express');

const { CONFIG_SERVICE } = process.env;
const serviceUrl = new URL(CONFIG_SERVICE);

const app = express();
app.use(express.json());

const serviceLocations = {
    orders: 'http://localhost:3001',
    restaurant: 'http://localhost:4000',
    delivery: 'http://localhost:5000',
    maps: 'http://localhost:5001',
};

app.get('/config/:serviceName', (req, res) => {
    const { serviceName } = req.params;

    if (serviceLocations[serviceName]) {
        res.json({ location: serviceLocations[serviceName] });
    } else {
        res.status(404).json({ message: 'Service not found' });
    }
});

app.put('/config/:serviceName', (req, res) => {
    const { serviceName } = req.params;
    const { newLocation } = req.body;

    serviceLocations[serviceName] = newLocation;

    res.json({ message: 'Updated!' });
})

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));