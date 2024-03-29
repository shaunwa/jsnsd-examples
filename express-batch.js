const express = require('express');
const app = express();

app.use(express.json());

const {
    listProducts,
    createProduct,
    deleteProduct,
    patchProduct,
} = require('./express-batch-handlers');

const routes = [
    { method: 'get', path: '/products', description: 'Load all products', handler: listProducts },
    { method: 'post', path: '/products', description: 'Create a product', handler: createProduct },
    { method: 'delete', path: '/products/:productId', description: 'Delete a product by id', handler: deleteProduct },
    { method: 'patch', path: '/products/:productId', description: 'Update a few fields on a product', handler: patchProduct }
];

routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

app.post('/batch', (req, res) => {
    const operations = req.body;
    const results = [];

    operations.forEach(operation => {
        const route = routes.find(r => r.method === operation.method && r.path === operation.path);

        let response;
        const req = { body: operation.body, query: operation.query, params: operation.params };
        const res = {
            json: result => response = result,
            set: () => {},
            sendStatus: () => {},
        };

        route.handler(req, res)

        results.push(response);
    });

    res.json(results);
});

app.get('/metadata', (req, res) => {
    const routeDescription = routes.map(route => `${route.method} ${route.path} - ${route.description}`)
        .join('\n');

    res.send(routeDescription);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});