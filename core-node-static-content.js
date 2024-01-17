const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const mime = require('mime-types');

const server = http.createServer(async (req, res) => {
    const filepath = path.join(__dirname, 'static', req.url);

    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
    };

    try {
        const fileContent = await fs.readFile(filepath, 'utf-8');
        const fileExt = path.extname(req.url);
        // const mimeType = mimeTypes[fileExt];
        const mimeType = mime.lookup(fileExt);
        res.writeHead(200, { 'Content-Type': mimeType });
        res.end(fileContent, 'utf-8');
    } catch (e) {
        res.writeHead(404);
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});