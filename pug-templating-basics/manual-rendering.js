const pug = require('pug');
const path = require('path');

const compiledTemplate = pug.compileFile(path.join(__dirname, 'index.pug'));

const names = [
    'Shaun',
    'Bob',
    'Jonathan',
    //
];

names.forEach(name => {
    const html = compiledTemplate({ name });
})

console.log(html);