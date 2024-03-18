const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputFile = path.join(__dirname, 'car.jpg');
const outputFile = path.join(__dirname, 'car200x200.jpg');

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

const resizeStream = sharp()
    .resize(200, 200)
    .rotate(90)
    .toColourspace('b-w');

readStream.pipe(resizeStream).pipe(writeStream);