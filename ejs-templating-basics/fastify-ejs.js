const fastify = require('fastify')({ logger: true });
const path = require('path');
const pointOfView = require('@fastify/view');
const ejs = require('ejs');

fastify.register(pointOfView, {
    engine: { ejs },
    root: path.join(__dirname, 'views'),
});

fastify.get('/', (req, reply) => {
    reply.view('index', {
        firstTimeVisitor: true,
        name: 'Shaun',
        someUnescapedValue: '<button>Claim my free gift!</button>',
    });
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