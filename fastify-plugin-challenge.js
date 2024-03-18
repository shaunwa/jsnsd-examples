const fastify = require('fastify');
const fastifyPlugin = require('fastify-plugin');

const app = fastify({ logger: true });

const users = [
    { id: 1, username: 'user1', password: 'pass1234' },
    { id: 2, username: 'user2', password: 'pass2345' },
    { id: 3, username: 'user3', password: 'pass3456' },
    { id: 4, username: 'user4', password: 'pass4567' },
    { id: 5, username: 'user5', password: 'pass5678' },
    { id: 6, username: 'user6', password: 'pass6789' },
    { id: 7, username: 'user7', password: 'pass7890' },
    { id: 8, username: 'user8', password: 'pass8901' },
    { id: 9, username: 'user9', password: 'pass9012' },
    { id: 10, username: 'user10', password: 'pass0123' }
];

const challengePlugin = fastifyPlugin((instance, opts, done) => {
    instance.addHook('preHandler', (req, reply, done) => {
        instance.log.info(`Body: ${JSON.stringify(req.body)}, URL Params: ${JSON.stringify(req.params)}`);

        const { userId } = req.params;
        const user = users.find(user => user.id === Number(userId));

        if (!user) {
            return reply.status(404).send('User not found');
        }

        req.user = user;

        done();
    });

    instance.addHook('preSerialization', (req, reply, payload, done) => {
        delete payload.password;
        done(null, payload);
    });

    done();
});

app.register(challengePlugin);

app.put('/user/:userId', (req, reply) => {
    const updates = req.body;
    const user = req.user;

    for (let key in updates) {
        user[key] = updates[key];
    }

    return user;
});

app.listen({ port: 3000 }, () => {
    app.log.info('Fastify is listening on port 3000');
});