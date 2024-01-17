const fastify = require('fastify');
const fastifyStatic = require('@fastify/static');
const path = require('path');

const app = fastify({ logger: true });

app.register(fastifyStatic, {
    root: path.join(__dirname, 'static')
});

app.listen({ port: 3000 }, () => {
    app.log.info('Fastify is listening on port 3000');
});