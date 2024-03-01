const fastify = require('fastify')({ logger: true });
const path = require('path');
const pointOfView = require('@fastify/view');
const handlebars = require('handlebars');

fastify.register(pointOfView, {
    engine: { handlebars },
    root: path.join(__dirname, 'views'),
});

fastify.get('/', (req, reply) => {
    reply.view('index', { name: 'Shaun' });
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();