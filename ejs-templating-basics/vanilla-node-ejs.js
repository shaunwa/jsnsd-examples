const http = require('http');
const ejs = require('ejs');
const path = require('path');

const server = http.createServer((req, res) => {
    ejs.renderFile(path.join(__dirname, 'index.ejs'), {
        firstTimeVisitor: true,
        name: 'Shaun',
        someUnescapedValue: '<button>Claim my free gift!</button>',
    }, (err, html) => {
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    });    
});

server.listen(3000, () => {
    console.log('Listening on port 3000');
})