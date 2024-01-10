const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    if (req.cookies['hasvisitedbefore']) {
        res.send('Welcome back!');
    } else {
        res.cookie('hasvisitedbefore', '1', { expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), httpOnly: true })
        res.send('Welcome, I see this is your first time!');
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});