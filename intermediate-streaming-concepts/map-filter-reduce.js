const fs = require('fs');
const { Readable, Transform } = require('stream');
const readline = require('readline');

const readStream = fs.createReadStream('user-info.txt');
const rl = readline.createInterface({ input: readStream });

let setupDone = false;

const lineByLine = new Readable({
    read() {
        if (!setupDone) {
            rl.on('line', line => {
                this.push(line);
            });

            rl.on('close', () => {
                this.push(null);
            });
            setupDone = true;
        }
    }
});

const mapStream = function(transformation) {
    return new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            const modifiedChunk = transformation(chunk);
            this.push(modifiedChunk);
            callback();
        }
    });
}

const filterStream = function(predicate) {
    return new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            if (predicate(chunk)) {
                this.push(chunk);
            }
            callback();
        }
    });
}

const reduceStream = function(accumulator, startingValue = 0) {
    let acc = startingValue;
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

const writeStream = fs.createWriteStream('./reduce-example.json')

lineByLine
    .pipe(mapStream(x => x.toString()))
    .pipe(mapStream(x => {
        const [name, age, email] = x.split(' - ');
        return { name, age: Number(age), email };
    }))
    .pipe(mapStream(x => x.age))
    .pipe(reduceStream((acc, x) => acc + x))
    .pipe(mapStream(x => x.toString()))
    .pipe(writeStream);