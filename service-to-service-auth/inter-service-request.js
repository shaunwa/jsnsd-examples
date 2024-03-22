const axios = require('axios');

const {
    ORDERS_SERVICE,
    RESTAURANT_SERVICE,
    RESTAURANT_SERVICE_API_KEY,
    DELIVERY_SERVICE,
    DELIVERY_SERVICE_API_KEY,
    MAPS_SERVICE,
    MAPS_SERVICE_API_KEY,
} = process.env;

const serviceConfigs = {
    orders: {
        location: ORDERS_SERVICE,
    },
    restaurant: {
        location: RESTAURANT_SERVICE,
        apiKey: RESTAURANT_SERVICE_API_KEY,
    },
    delivery: {
        location: DELIVERY_SERVICE,
        apiKey: DELIVERY_SERVICE_API_KEY,
    },
    maps: {
        location: MAPS_SERVICE,
        apiKey: MAPS_SERVICE_API_KEY,
    }
}

async function interServiceRequest(serviceName, method, path, payload) {
    const service = serviceConfigs[serviceName];

    const response = await axios({
        method,
        url: service.location + path,
        data: payload,
        headers: {
            Authorization: service.apiKey,
        }
    });
    return response;
}

module.exports = interServiceRequest;