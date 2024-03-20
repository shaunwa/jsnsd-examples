const axios = require('axios');

module.exports = async function(services, serviceName, method, path, payload) {
    let shouldRetry = true;
    while (shouldRetry) {
        try {
            if (method === 'GET') {
                const res = await axios.get(`${services[serviceName]}${path}`);
                return res.data;
            } else if (method === 'POST') {
                const res = await axios.post(`${services[serviceName]}${path}`, payload);
                return res.data;
            } else {
                // ...
            }
        } catch (e) {
            if (e.code === 'ECONNREFUSED') {
                const { CONFIG_SERVICE } = process.env;
                const configRes = await axios.get(`${CONFIG_SERVICE}/config/${serviceName}`);
                services[serviceName] = configRes.data.location;
            } else {
                console.log(e);
            }
            shouldRetry = false;
        }
    }
}