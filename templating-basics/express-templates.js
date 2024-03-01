const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

app.engine('hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const users = [
    {id: 1, name: 'Alice Smith', email: 'alice@example.com', interests: 'reading, gardening, cycling'},
    {id: 2, name: 'Bob Jones', email: 'bob@example.com', interests: 'hiking, photography, cooking'},
    {id: 3, name: 'Charlie Brown', email: 'charlie@example.com', interests: ''},
    {id: 4, name: 'Dana White', email: 'dana@example.com', interests: 'boxing, writing, painting'}
];

app.get('/user-profile/:userId', (req, res) => {
    const { userId } = req.params;
    const user = users.find(u => u.id === Number(userId));
    res.render('user-profile', {
        ...user,
        userHasInterests: user.interests.length > 0,
        username: 'shaunwa',
    });
})

app.get('/users', (req, res) => {
    res.render('users-list', {
        users,
        buttonText: 'Send Friend Request!',
    });
})

// Starting the server
app.listen(3000, () => console.log(`Server is running on http://localhost:3000`));