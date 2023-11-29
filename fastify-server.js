const fastify = require('fastify');
const quotes = require('./quotes.js');

const app = fastify({ logger: true });

app.get('/time', (req, res) => {
    const dateAndTime = new Date().toISOString();
    return `The current date and time is: ${dateAndTime}`;
});

app.get('/quote', (req, res) => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return randomQuote;
});

app.listen({ port: 3002 }, () => {
    app.log.info('Fastify is listening on port 3002');
});