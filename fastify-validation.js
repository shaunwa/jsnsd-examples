const fastify = require('fastify')({ logger: true });

fastify.route({
    method: 'POST',
    url: '/events',
    schema: {
        body: {
            type: 'object',
            required: ['name', 'contactEmail', 'numberOfTicketsAvailable'],
            properties: {
                name: { type: 'string', minLength: 1, maxLength: 50 },
                contactEmail: { type: 'string', format: 'email', maxLength: 100 },
                numberOfTicketsAvailable: { type: 'integer', minimum: 0, maximum: 100000 },
            },
            additionalProperties: false,
        },
    },
    handler: function(req, reply) {
        return req.body;
    }
})

fastify.listen({ port: 3000 }, () => {
    fastify.log.info('Fastify is listening on port 3000');
});