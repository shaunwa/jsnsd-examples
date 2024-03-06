const db = {
    getUserById: (id) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve({ id, name: 'Shaun', age: 123, email: 'shaun@gmail.com' }), 3000);
        });
    }
}

module.exports = db;