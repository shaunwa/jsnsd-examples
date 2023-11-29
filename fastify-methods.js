const fastify = require('fastify');

const app = fastify({ logger: true });

app.get('/users', (req, res) => {
    return { name: 'Shaun', username: 'shaun' };
});

app.post('/users', (req, res) => {
    return 'Creating a new user...';
});

app.put('/users', (req, res) => {
    return 'Updating an entire user...';
});

app.patch('/users', (req, res) => {
    return 'Updating only a few fields for a user...';
});

app.delete('/users', (req, res) => {
    return 'Deleting a user...';
});

app.listen({ port: 3000 }, () => {
    app.log.info('Fastify is listening on port 3000');
});