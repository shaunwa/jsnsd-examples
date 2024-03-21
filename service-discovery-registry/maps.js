require('dotenv').config();
const express = require('express');
const startService = require('./start-service');

const app = express();

app.get('/estimated-time', (req, res) => {
    const { start, end } = req.query;
    console.log(`Calculating driving time from ${start} to ${end}...`);
    res.json({ estimatedTime: 45 });
});

startService(app, 'maps', 4000);