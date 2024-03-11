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

app.post('/users', (req, res) => {
    const { name, email, password, socialMediaLinks } = req.body;

    if (!validate(createUserBodySpecification, req.body)) {
        return res.sendStatus(400);
    }

    // const sanitizedData = sanitize(sanitizeSpecification, req.body);

    const htmlTagRegex = /<[^>]+>/g;
    const newUser = {
        name: name.replace(htmlTagRegex, ''),
        email: email.replace(htmlTagRegex, ''),
        password: password,
        socialMediaLinks: socialMediaLinks.map(link => link.replace(htmlTagRegex, '')),
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});