const fastify = require('fastify');
const cookie = require('@fastify/cookie');

const app = fastify({ logger: true });

app.register(cookie);

app.get('/', (req, reply) => {
    if (req.cookies['hasvisitedbefore']) {
        return 'Welcome back!';
    } else {
        reply.setCookie('hasvisitedbefore', '1', { expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), httpOnly: true });
        return 'Welcome, I see this is your first time!';
    }
});

app.listen({ port: 3000 }, () => {
    app.log.info('Server is listening on port 3000');
});