const fastify = require('fastify');

const app = fastify({ logger: true });

let nextId = 125;

let products = [{
    id: '123',
    name: 'Hat',
    price: '5.00',
    slug: 'cool-hat'
}, {
    id: '124',
    name: 'Bookshelf',
    price: '100.00',
    slug: 'nice-big-bookshelf',
}];

app.get('/products', (request, reply) => {
    return products;
});

app.get('/products/:id', (request, reply) => {
    const { id } = request.params;
    const product = products.find(p => p.id === id);
    if (product) {
        return product;
    } else {
        reply.code(404).send({ message: 'Could not find the product with id ' + id });
    }
});

app.post('/products', (request, reply) => {
    const { name, price, slug } = request.body;

    if (name && price && slug) {
        let newId = nextId;
        let newProduct = { id: newId, name, price, slug };
        products.push(newProduct);
        nextId += 1;
        reply
            .code(201)
            .header('Location', '/products/' + newId)
            .send(newProduct);
    }
});

app.listen({ port: 3000 }, () => {
    app.log.info('Fastify is listening on port 3000');
});