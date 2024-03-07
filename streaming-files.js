const fs = require('fs');
const { Transform } = require('stream');

const readStream = fs.createReadStream('./streaming-input.txt');
const writeStream = fs.createWriteStream('./streaming-output.txt');

const uppercaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        console.log(`Chunk: ${chunk.toString()}`);
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

readStream.pipe(uppercaseTransform).pipe(writeStream);

writeStream.on('finish', () => {
    console.log('Done!');
});