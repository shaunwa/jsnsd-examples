function permissionsRequired(permission) {
    return function(req, res, next) {
        if (req.permissions.includes(permission)) {
            return next();
        }
    
        return res.sendStatus(401);
    }
}

module.exports = permissionsRequired;