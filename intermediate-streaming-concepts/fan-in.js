const fs = require('fs');

const r1 = fs.createReadStream('copy-1.txt');
const r2 = fs.createReadStream('copy-2.txt');
const r3 = fs.createReadStream('copy-3.txt');

const w = fs.createWriteStream('combined.txt');

let totalNumOfInputs = 3;
let numEnded = 0;

function fanIn(source) {
    source.pipe(w, { end: false });
    source.on('end', () => {
        numEnded += 1;
        if (numEnded === totalNumOfInputs) {
            w.end();
        }
    });
}

fanIn(r1);
fanIn(r2);
fanIn(r3);

w.on('finish', () => {
    console.log('Done!');
});