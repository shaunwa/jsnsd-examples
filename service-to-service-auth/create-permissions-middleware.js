const createPermissionsMiddleware = (permissions) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.sendStatus(401);
        }

        const permissionsForKey = permissions[authHeader];
        req.permissions = permissionsForKey || [];
        next();
    }
}

module.exports = createPermissionsMiddleware;