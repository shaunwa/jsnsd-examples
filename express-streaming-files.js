const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');
const express = require('express');
const Busboy = require('busboy');

const app = express();

app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'express-query-params.mp4');
    const readStream = fs.createReadStream(filePath);
    fs.stat(filePath, (err, stats) => {
        res.writeHead(200, {
            'Content-Type': 'video/mp4',
            'Content-Length': stats.size,
        });
        readStream.pipe(res);
    });
});

const uppercaseTransformer = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    },
});

app.post('/upload', (req, res) => {
    const busboy = Busboy({ headers: req.headers });
    busboy.on('file', (fieldname, file, info) => {
        const writeStream = fs.createWriteStream(path.join(__dirname, 'streaming-uploads', info.filename));
        file.pipe(uppercaseTransformer).pipe(writeStream);
    });
    busboy.on('finish', () => {
        res.writeHead(200);
        res.end('Done');
    });
    req.pipe(busboy);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});