const express = require('express');
const path = require('path');

const app = express();

const users = [
    {id: 1, name: 'Alice Smith', email: 'alice@example.com', interests: 'reading, gardening, cycling'},
    {id: 2, name: 'Bob Jones', email: 'bob@example.com', interests: 'hiking, photography, cooking'},
    {id: 3, name: 'Charlie Brown', email: 'charlie@example.com', interests: ''},
    {id: 4, name: 'Dana White', email: 'dana@example.com', interests: 'boxing, writing, painting'}
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', {
        firstTimeVisitor: false,
        name: 'Shaun',
        users,
        nameFilter: 'a',
    });
});

// Starting the server
app.listen(3000, () => console.log(`Server is running on http://localhost:3000`));