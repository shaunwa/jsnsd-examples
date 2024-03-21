const axios = require('axios');
require('dotenv').config();

const { SERVICE_REGISTRY } = process.env;

function startService(app, serviceName, port) {
    app.listen(port, async () => {
        await axios.post(`${SERVICE_REGISTRY}/register`, { name: serviceName, location: `http://localhost:${port}`})
        return console.log(`Service ${serviceName} is listening on port ${port}`);
    }).on('error', async err => {
        if (err.code === 'EADDRINUSE') {
            startService(app, serviceName, port + 1);
        } else {
            console.error(err);
        }
    });
}

module.exports = startService;