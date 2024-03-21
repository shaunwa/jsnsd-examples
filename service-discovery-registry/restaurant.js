require('dotenv').config();
const express = require('express');
const axios = require('axios');
const startService = require('./start-service');

const app = express();

app.post('/restaurants/:restaurantId/orders', async (req, res) => {
    res.json({ estimatedTime: 30 });
});

app.get('/restaurants/:restaurantId/address', (req, res) => {
    res.json({ address: '123 Main Street' });
});

startService(app, 'restaurant', 3000);