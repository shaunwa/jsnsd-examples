const axios = require('axios');

async function requestWithRetry(method, url, payload) {
    const maxRetries = 4;
    let numRetries = 0;
    let retryTime = 500;
    let shouldRetry = true;
    let errorToReturn;

    while (shouldRetry && numRetries < maxRetries) {
        try {
            const response = await axios({ method, url, data: payload });
            return response;
        } catch (err) {
            errorToReturn = err;
            if (err.code !== 'ECONNREFUSED') {
                console.error(err);
                shouldRetry = false;
            } else {
                console.log(`Retrying in ${retryTime} ms`)
                await new Promise((resolve => setTimeout(resolve, retryTime)));
                retryTime *= 2;
                numRetries += 1;
            }
        }
    }

    throw errorToReturn;
}

module.exports = requestWithRetry;