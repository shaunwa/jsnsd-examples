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

isFirstCSVLine = true;

const convertToCSV = new Transform({
    transform(chunk, encoding, callback) {
        const [name, age, email] = chunk.toString().split(' - ');
        if (isFirstCSVLine) {
            this.push('name,age,email\n');
        }
        this.push(`${name},${age},${email}\n`);
        isFirstCSVLine = false;
        callback();
    }
});

const convertToJSON = new Transform({
    transform(chunk, encoding, callback) {
        const [name, age, email] = chunk.toString().split(' - ');
        this.push(`{ "name": "${name}", "age": ${age}, "email": "${email}" }\n`);
        callback();
    }
});


const ws1 = fs.createWriteStream('user-info.csv');
const ws2 = fs.createWriteStream('user-info.json');

lineByLine.pipe(convertToCSV).pipe(ws1);
lineByLine.pipe(convertToJSON).pipe(ws2);

ws1.on('finish', () => console.log('CSV is done!'));
ws2.on('finish', () => console.log('JSON is done!'));