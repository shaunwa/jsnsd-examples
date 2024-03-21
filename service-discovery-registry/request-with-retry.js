const axios = require('axios');

module.exports = () => {
    const services = {};

    return async function(serviceName, method, path, payload) {
        let shouldRetry = true;
        const { SERVICE_REGISTRY } = process.env;

        if (!services[serviceName]) {
            const registryRes = await axios.get(`${SERVICE_REGISTRY}/services/${serviceName}`);
            services[serviceName] = registryRes.data.location;
        }

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
                    const registryRes = await axios.get(`${SERVICE_REGISTRY}/services/${serviceName}`);
                    services[serviceName] = registryRes.data.location;
                } else {
                    console.log(e);
                }
                shouldRetry = false;
            }
        }
    }
};