const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const inputFile = path.join(__dirname, 'express-query-params.mp4');
const outputFile = path.join(__dirname, 'express-query-params.mp4.gz');

const gzipStream = zlib.createGzip();

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

readStream.pipe(gzipStream).pipe(writeStream);