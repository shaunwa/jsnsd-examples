const createApiKeyMiddleware = (apiKey) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader || authHeader !== apiKey) {
            return res.sendStatus(401);
        }

        next();
    }
}

module.exports = createApiKeyMiddleware;