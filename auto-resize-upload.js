const fs = require('fs');
const path = require('path');
const express = require('express');
const Busboy = require('busboy');
const sharp = require('sharp');

const app = express();

app.post('/upload', (req, res) => {
    const busboy = Busboy({ headers: req.headers });
    busboy.on('file', (fieldname, file, info) => {
        const fullSizeWriteStream = fs.createWriteStream(path.join(__dirname, 'auto-resize-uploads', 'full-size-' + info.filename));
        const mediumWriteStream = fs.createWriteStream(path.join(__dirname, 'auto-resize-uploads', 'medium-' + info.filename));
        const smallWriteStream = fs.createWriteStream(path.join(__dirname, 'auto-resize-uploads', 'small-' + info.filename));

        const mediumSharp = sharp().resize(500, 500);
        const smallSharp = sharp().resize(200, 200);

        file.pipe(fullSizeWriteStream);
        file.pipe(mediumSharp).pipe(mediumWriteStream);
        file.pipe(smallSharp).pipe(smallWriteStream);
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