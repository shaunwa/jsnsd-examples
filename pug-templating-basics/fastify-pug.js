const fastify = require('fastify')({ logger: true });
const path = require('path');
const pointOfView = require('@fastify/view');
const pug = require('pug');

const users = [
    {id: 1, name: 'Alice Smith', email: 'alice@example.com', interests: 'reading, gardening, cycling'},
    {id: 2, name: 'Bob Jones', email: 'bob@example.com', interests: 'hiking, photography, cooking'},
    {id: 3, name: 'Charlie Brown', email: 'charlie@example.com', interests: ''},
    {id: 4, name: 'Dana White', email: 'dana@example.com', interests: 'boxing, writing, painting'}
];

fastify.register(pointOfView, {
    engine: { pug },
    root: path.join(__dirname, 'views'),
});

fastify.get('/', (req, reply) => {
    reply.view('index', {
        name: 'John',
        unreadMessagesCount: 0,
        users,
    });
});

fastify.get('/challenge', (req, reply) => {
  reply.view('challenge', {
    name: 'Shaun',
    bio: 'I like programming',
    email: 'shaun@gmail.com',
    website: 'shaunwassell.com',
    github: 'shaunwa',
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