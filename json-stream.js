const fs = require('fs')
const { Transform } = require('stream');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const path = require('path');

const inputFile = path.join(__dirname, 'iris.json');
const outputFile = path.join(__dirname, 'transformed-iris.json');

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

const cmToInches = cm => cm * 0.393701;

const transformStream = new Transform({
    objectMode: true,
    transform(obj, encoding, callback) {
        const transformedObject = {
            ...obj,
            sepalLength: cmToInches(obj.sepalLength),
            sepalWidth: cmToInches(obj.sepalWidth),
            petalLength: cmToInches(obj.petalLength),
            petalWidth: cmToInches(obj.petalWidth),
        };

        this.push(JSON.stringify(transformedObject) + '\n');
        callback();
    }
})

readStream
    .pipe(parser())
    .pipe(streamArray())
    .pipe(transformStream)
    .pipe(writeStream);