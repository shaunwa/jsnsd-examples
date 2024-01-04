const fastify = require('fastify');

const app = fastify({ logger: true });

app.get('/', (request, reply) => {
    app.log.info(`The content type is ${request.headers['content-type']}`);
    reply.header('Content-Type', 'blah/blah').send('Hi this is Fastify!');
});

app.listen({ port: 3000 }, () => {
    app.log.info('Fastify is listening on port 3000');
});