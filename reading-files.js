const fs = require('fs').promises;

// const fileContent = fs.readFileSync('reading-files.txt', 'utf-8');

// function onReadData(err, data) {
//     if (err) {
//         console.log('Oh no!')
//         throw err;
//     }

//     console.log(data);
// }

// fs.readFile('reading-files.txt', 'utf-8', onReadData);

async function run() {
    const fileContent = await fs.readFile('reading-files.txt', 'utf-8');
    console.log(fileContent);
}

run()
