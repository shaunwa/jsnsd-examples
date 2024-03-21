const axios = require('axios');

async function requestWithRetry(method, url, payload) {
    let shouldRetry = true;

    while (shouldRetry) {
        try {
            const response = await axios({ method, url, data: payload });
            return response;
        } catch (err) {
            console.error(err);
            if (err.code !== 'ECONNREFUSED') {
                console.error(err);
                shouldRetry = false;
            } else {
                console.log('Retrying in 1 second')
                await new Promise((resolve => setTimeout(resolve, 1000)));
            }
        }
    }
}

module.exports = requestWithRetry;