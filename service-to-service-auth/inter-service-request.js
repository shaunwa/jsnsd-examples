const axios = require('axios');

const {
    ORDERS_SERVICE,
    RESTAURANT_SERVICE,
    DELIVERY_SERVICE,
    MAPS_SERVICE,
    ORDERS_TO_RESTAURANT_KEY,
    ORDERS_TO_DELIVERY_KEY,
    DELIVERY_TO_RESTAURANT_KEY,
    DELIVERY_TO_MAPS_KEY,
} = process.env;

const serviceConfigs = {
    orders: {
        location: ORDERS_SERVICE,
    },
    restaurant: {
        location: RESTAURANT_SERVICE,
        keys: {
            orders: ORDERS_TO_RESTAURANT_KEY,
            delivery: DELIVERY_TO_RESTAURANT_KEY,
        }
    },
    delivery: {
        location: DELIVERY_SERVICE,
        keys: {
            orders: ORDERS_TO_DELIVERY_KEY,
        }
    },
    maps: {
        location: MAPS_SERVICE,
        keys: {
            delivery: DELIVERY_TO_MAPS_KEY,
        }
    }
}

function createInterServiceRequest(fromServiceName) {
    return async function interServiceRequest(toServiceName, method, path, payload) {
        const service = serviceConfigs[toServiceName];
        const serviceKey = service.keys[fromServiceName];

        const response = await axios({
            method,
            url: service.location + path,
            data: payload,
            headers: {
                Authorization: serviceKey,
            }
        });
        return response;
    }
}

module.exports = createInterServiceRequest;