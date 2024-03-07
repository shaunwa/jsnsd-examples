const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');
const express = require('express');
const Busboy = require('busboy');

const app = express();

const splitTransform = new Transform({
    transform(chunk, encoding, callback) {
        const splitChunks = chunk.toString().split(/[-\n]/);
        splitChunks.map(chunk => chunk.trim() + '\n').forEach(chunk => {
            this.push(chunk);
        });
        callback();
    }
});

const emailFilterTransform = new Transform({
    transform(chunk, encoding, callback) { 
        if (chunk.toString().includes('@')) {
            this.push(chunk);
        }
        callback();
    }
});

const notEmailFilterTransform = new Transform({
    transform(chunk, encoding, callback) { 
        if (!chunk.toString().includes('@')) {
            this.push(chunk);
        }
        callback();
    }
});

app.post('/upload', (req, res) => {
    const busboy = Busboy({ headers: req.headers });
    busboy.on('file', (fieldname, file, info) => {
        const namesWriteStream = fs.createWriteStream('./split-stream-names.txt');
        const emailsWriteStream = fs.createWriteStream('./split-stream-emails.txt');

        const split = file.pipe(splitTransform);
        split.pipe(emailFilterTransform).pipe(emailsWriteStream);
        split.pipe(notEmailFilterTransform).pipe(namesWriteStream);
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