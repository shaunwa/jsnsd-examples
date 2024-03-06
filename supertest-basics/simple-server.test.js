const request = require('supertest');
const app = require('./simple-server');

describe('The GET /hello endpoint', () => {
    it('Sends back a response with the appropriate characteristics', async () => {
        const res = await request(app)
            .get('/hello') // The path
            .set('Accept', 'application/json') // Setting headers
            .send({ message: 'Hello!' }) // Setting the request body
            .expect('Content-Type', 'application/json; charset=utf-8') // Testing the headers
            .expect(200) // Testing the response status code
            .expect({ a: 1, b: 2, c: 3, message: 'Hello!' }) // Testing the response body
    });
});

request(app)
    .get('/names')
    .query({ s: 's' }) // Setting query params
    .expect(['Shaun', 'James', 'Simona'])
    .end((err, res) => {
        if (err) throw err;
        console.log('Success!');
    });

request(app)
    .post('/greeting')
    .set('Cookie', ['isReturningVisitor=1']) // Setting cookies
    .expect('Welcome back!')
    .end((err, res) => {
        if (err) throw err;
        console.log('Success!');
    });