const express = require('express');
const { body, query, validationResult, matchedData } = require('express-validator');

const app = express();

const blogPosts = [];

app.use(express.json());

const validationMiddleware = (req, res, next) => {
    const validationPassed = req.body.title &&
                             req.body.subtitle &&
                             req.body.content &&
                             typeof(req.body.title) === 'string' &&
                             typeof(req.body.subtitle) === 'string' &&
                             typeof(req.body.content) === 'string';

    if (validationPassed) {
        return next();
    }

    res.sendStatus(400);
}

const respondIfValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const data = matchedData(req, { includeOptionals: true });
        req.data = data;
        return next();
    }

    res.status(400).json({ errors: errors.array() });
}

app.post('/blog-posts',
    body('title').trim().notEmpty().escape(),
    body('subtitle').trim().notEmpty().escape(),
    body('email').isEmail(),
    query('category').trim().isString().default('Uncategorized'),
    respondIfValidationErrors,
    (req, res) => {
    const newBlogPost = req.data;
    blogPosts.push(newBlogPost);
    return res.sendStatus(201);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});