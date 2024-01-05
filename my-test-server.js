const express = require('express');
const app = express();

app.use(express.json());

const users = [
    {"id": "100", "name": "Judy Simpson", "age": 22, "hairColor": "black"},
    {"id": "101", "name": "Justin Wagner", "age": 49, "hairColor": "black"},
    {"id": "102", "name": "Donna Lopez", "age": 50, "hairColor": "white"},
    {"id": "103", "name": "Jeremy Kerr", "age": 31, "hairColor": "black"},
    {"id": "104", "name": "Jodi Gardner", "age": 56, "hairColor": "white"},
    {"id": "105", "name": "Maria Barrera", "age": 67, "hairColor": "brown"},
    {"id": "106", "name": "Cynthia Roberts", "age": 44, "hairColor": "black"},
    {"id": "107", "name": "Daniel Morrison", "age": 47, "hairColor": "white"},
    {"id": "108", "name": "Richard Johnson", "age": 45, "hairColor": "white"},
    {"id": "123", "name": "Susan Bishop", "age": 33, "hairColor": "red"}
]

app.use('/test', (req, res) => {
    const method = req.method;
    const queryParams = req.query;
    const headers = req.headers;
    const body = req.body;

    res.send(`Method: ${method},\nQuery params: ${JSON.stringify(queryParams)},\nHeaders: ${JSON.stringify(headers)},\nBody: ${JSON.stringify(body)}`);
});

function userToFormat(user, format) { 
    if (format === 'application/json') {
        return user;
    } else if (format === 'text/plain') {
        str = '';
        for (let key in user) {
            str += `${key}: ${user[key]}\n`
        }
        return str;
    }
}

app.post('/load-user', (req, res) => {
    const { id } = req.body;
    const { fields } = req.query;
    const accept = req.get('Accept');

    const user = users.find(user => user.id === id);

    if (fields) {
        const includeFields = fields.split(',');
        const responseUser = {};

        for (let field of includeFields) {
            responseUser[field] = user[field];
        }

        res.send(userToFormat(responseUser, accept));
    } else {
        res.send(userToFormat(user, accept));
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});