const { Transform } = require('stream');

const reduceStream = function(accumulator, startingValue = 0) {
    const acc = startingValue;
    return new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            acc = accumulator(acc, chunk);
            callback();
        },
        flush() {
            this.push(acc);
        }
    });
}