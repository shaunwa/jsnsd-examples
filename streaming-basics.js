const Stream = require('stream');

const readable = new Stream.Readable();

readable.push('One');
readable.push('Two');
readable.push('Three');
readable.push(null);

const transform = new Stream.Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

const duplex = new Stream.Duplex({
    write(chunk, encoding, callback) {
        console.log(`${chunk.toString()} is passing through the duplex`);
        this.push(chunk);
        callback();
    },
    read() {
        this.push(null);
    }
});

let collectedData = '';

const writeable = new Stream.Writable({
    write(chunk, encoding, callback) {
        collectedData += chunk.toString();
        callback();
    },
});

readable.pipe(duplex).pipe(transform).pipe(writeable);

writeable.on('finish', () => {
    console.log('Here is the collected data:');
    console.log(collectedData);
});