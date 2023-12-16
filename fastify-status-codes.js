const fastify = require('fastify');

const app = fastify({ logger: true });

const users = [{
    name: 'Shaun',
    email: 'shaun@gmail.com',
}, {
    name: 'Bob',
    email: 'bob@gmail.com',
}, {
    name: 'Simona',
    email: 'simona@gmail.com',
}];

app.get('/users', (request, reply) => {
    reply.code(399).send(users);
});

app.listen({ port: 3000 }, () => {
    app.log.info('Fastify is listening on port 3000');
});