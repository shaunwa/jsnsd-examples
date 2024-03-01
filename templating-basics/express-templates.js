const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

app.engine('hbs', engine());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/:name', (req, res) => {
    const name = '<script>alert("Hacked!");</script>'
    res.render('index', { name, layout: false });
});

// Starting the server
app.listen(3000, () => console.log(`Server is running on http://localhost:3000`));