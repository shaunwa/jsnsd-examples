const fastify = require('fastify');

const app = fastify({ logger: true });

app.post('/users', (req, res) => {
    console.log(req.body);
    return 'Data received...';
});

app.listen({ port: 3000 }, () => {
    app.log.info('Fastify is listening on port 3000');
});