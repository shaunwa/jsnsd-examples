const db = require('./db');

async function getUserDataString(id) {
    const user = await db.getUserById(id);
    const userStr = `${user.name} - ${user.email} - ${user.age} years old`;
    return userStr;
}

module.exports = getUserDataString;