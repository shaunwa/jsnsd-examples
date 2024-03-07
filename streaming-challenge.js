const fs = require('fs');
const { Transform } = require('stream');

const readStream = fs.createReadStream('./streaming-input.txt');
const writeStream = fs.createWriteStream('./streaming-output.txt');

const splitWords = new Transform({
    transform(chunk, encoding, callback) {
        const words = chunk.toString().split(/\s+/);
        words.forEach(word => this.push(word));
        callback();
    }
});

const addSpace = new Transform({
    transform(chunk, encoding, callback) {
        this.push(`${chunk} `);
        callback();
    }
})

const reverse = new Transform({
    transform(chunk, encoding, callback) {
        const reversedChunk = chunk.toString().split('').reverse().join('');
        this.push(reversedChunk);
        callback();
    }
});

readStream.pipe(splitWords).pipe(reverse).pipe(addSpace).pipe(writeStream);

writeStream.on('finish', () => {
    console.log('Done!');
});