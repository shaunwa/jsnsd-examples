const express = require('express');

const app = express();

app.use(express.json());

const users = [];

const createUserBodySpecification = {
    name: 'string',
    email: 'string',
    password: 'string',
    socialMediaLinks: ['string'],
}

function validate(specification, data) {
    for (let key in specification) {
        if (data[key] == null) {
            return false;
        }

        if (Array.isArray(specification[key])) {
            const type = specification[key][0];
            if (data[key].some(element => typeof(element) !== type)) {
                return false;
            }
        } else if (typeof(data[key]) !== specification[key]) {
            return false;
        }
    }

    return true;
}

const htmlTagRegex = /<[^>]+>/g;

const createUserBodySanitization = {
    name: (originalName) => originalName.replace(htmlTagRegex, ''),
    email: (originalEmail) => originalEmail.replace(htmlTagRegex, ''),
    password: x => x,
    socialMediaLinks: (links) => links.map(link => link.replace(htmlTagRegex, '')),
}

function sanitize(specification, data) {
    const sanitizedData = {};

    for (let key in data) {
        if (specification[key] != null) {
            sanitizedData[key] = specification[key](data[key]);
        }
    }

    return sanitizedData;
}

app.post('/users', (req, res) => {
    const { name, email, password, socialMediaLinks } = req.body;

    if (!validate(createUserBodySpecification, req.body)) {
        return res.sendStatus(400);
    }

    const sanitizedData = sanitize(sanitizeSpecification, req.body);

    users.push(sanitizedData);

    res.status(201).json(sanitizedData);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});