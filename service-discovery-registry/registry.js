const { URL } = require('url');
require('dotenv').config();
const express = require('express');

const { SERVICE_REGISTRY } = process.env;
const serviceUrl = new URL(SERVICE_REGISTRY);

const app = express();
app.use(express.json());

const registeredServices = {};

app.post('/register', (req, res) => {
    const { name, location } = req.body;
    registeredServices[name] = location;
    res.status(201).json({ message: 'The service has been registered' });
});

app.get('/services/:serviceName', (req, res) => {
    const { serviceName } = req.params;
    const serviceLocation = registeredServices[serviceName];
    if (serviceLocation) {
        return res.json({ location: serviceLocation });
    } else {
        return res.status(404).json({ message: `The service ${serviceName} was not found` });
    }
});

app.listen(serviceUrl.port, () => console.log(`Server is running on ${serviceUrl.href}`));