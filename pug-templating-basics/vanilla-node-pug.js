const http = require('http');
const pug = require('pug');
const path = require('path');

const server = http.createServer((req, res) => {
    const html = pug.renderFile(path.join(__dirname, 'index.pug'), {
        name: 'Shaun',
    });

    res.setHeader('Content-Type', 'text/html');
    res.end(html);
});

server.listen(3000, () => {
    console.log('Listening on port 3000');
})