const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'views', 'index.hbs');
    fs.readFile(filePath, 'utf-8', (err, content) => {
        let renderedTemplate;

        if (req.url === '/shaun') {
            renderedTemplate = content.replace('{{name}}', 'Shaun');
        } else if (req.url === '/simona') {
            renderedTemplate = content.replace('{{name}}', 'Simona');
        } else if (req.url === '/lalo') {
            renderedTemplate = content.replace('{{name}}', 'Lalo');
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(renderedTemplate);
    })
});

server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});