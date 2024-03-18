const fastify = require('fastify');

const app = fastify({ logger: true });

const loggerPlugin = (instance, opts, done) => {
    instance.addHook('onRequest', (req, reply, done) => {
        instance.log.info(`Received a ${req.method} request on ${req.url}`);
        done();
    });

    done();
}

app.register(loggerPlugin);

app.get('/hello', (req, reply) => {
    app.log.info('Received a GET request on /hello');
    return 'Hello!';
});

app.get('/hello2', (req, reply) => {
    app.log.info('Received a GET request on /hello2');
    return 'Hello too!';
});

app.listen({ port: 3000 }, () => {
    app.log.info('Fastify is listening on port 3000');
});