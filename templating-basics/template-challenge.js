const fastify = require('fastify')({ logger: true });
const path = require('path');
const pointOfView = require('@fastify/view');
const handlebars = require('handlebars');

fastify.register(pointOfView, {
    engine: { handlebars },
    root: path.join(__dirname, 'views'),
    layout: './layouts/main',
    options: {
      partials: {
        navbar: './partials/nav-bar.hbs',
      }
    }
});

const users = [
    {id: 1, name: 'Alice Smith', email: 'alice@example.com', interests: 'reading, gardening, cycling'},
    {id: 2, name: 'Bob Jones', email: 'bob@example.com', interests: 'hiking, photography, cooking'},
    {id: 3, name: 'Charlie Brown', email: 'charlie@example.com', interests: ''},
    {id: 4, name: 'Dana White', email: 'dana@example.com', interests: 'boxing, writing, painting'}
];

fastify.get('/user-profile/:userId', (req, reply) => {
    const { userId } = req.params;
    const user = users.find(u => u.id === Number(userId));
    reply.view('user-profile', { ...user, userHasInterests: user.interests.length > 0 });
});

fastify.get('/users', (req, reply) => {
  reply.view('users-list', { users, buttonText: 'Send Friend Request!' });
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