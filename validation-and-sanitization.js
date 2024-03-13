const express = require('express');

const app = express();

app.use(express.json());

const users = [];

const createUserBodySpecification = {
    name: { type: 'string' },
    email: { type: 'string', required: false, customValidation: value => /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(value) },
    password: { type: 'string' },
    socialMediaLinks: { type: ['string'] },
}

function getValidationErrors(specification, data) {
    const defaults = { required: true };

    const validationErrors = [];

    for (let key in specification) {
        const settings = { ...defaults, ...specification[key] };

        if (settings.required && data[key] == null) {
            validationErrors.push({ field: key, error: "Required", message: `The ${key} field is required, but was missing` });
        }

        if (Array.isArray(settings.type)) {
            const type = settings.type[0];
            if (!Array.isArray(data[key]) || data[key].some(element => typeof(element) !== type)) {
                validationErrors.push({ field: key, error: "Wrong type", message: `The ${key} field must be an array of ${settings.type}s`});
            }
        } else if (typeof(data[key]) !== settings.type) {
            if (settings.required || data[key] != null) {
                validationErrors.push({ field: key, error: "Wrong type", message: `The ${key} field must be a ${settings.type}`});
            }
        }

        if (settings.customValidation && (settings.required || data[key] != null)) {
            if (!settings.customValidation(data[key])) {
                validationErrors.push({ field: key, error: "Custom Validation Failed" , message: "A custom validation failed for this value" });
            }
        }
    }

    return validationErrors;
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
    const validationErrors = getValidationErrors(createUserBodySpecification, req.body);
    if (validationErrors.length > 0) {
        return res.status(400).json({
            message: "Validation Error",
            errors: {
                body: validationErrors,
            }
        });
    }

    const sanitizedData = sanitize(createUserBodySanitization, req.body);

    users.push(sanitizedData);

    res.status(201).json(sanitizedData);
});

const userFiltersSpecification = {
    search: { type: 'string' },
    age: { type: 'number' },
    hairColor: { type: 'string' },
}

app.get('/users', (req, res) => {
    const queryErrors = getValidationErrors(userFiltersSpecification, req.query);

    if (queryErrors.length > 0) {
        return res.status(400).json({
            message: "Validation Error",
            errors: {
                query: queryErrors,
            },
        }); 
    }

    res.status(200).json([]);
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});