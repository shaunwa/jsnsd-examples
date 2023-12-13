const express = require('express');

const app = express();

const products = [
    {
        id: 1,
        name: 'Laptop',
        price: 799.99,
        description: 'A powerful laptop with a high-resolution display.'
    },
    {
        id: 2,
        name: 'Smartphone',
        price: 499.99,
        description: 'The latest smartphone with a stunning camera.'
    },
    {
        id: 3,
        name: 'Headphones',
        price: 149.99,
        description: 'High-quality noise-canceling headphones for music lovers.'
    },
    {
        id: 4,
        name: 'Camera',
        price: 899.99,
        description: 'A professional-grade camera for photography enthusiasts.'
    },
    {
        id: 5,
        name: 'Smartwatch',
        price: 249.99,
        description: 'A smartwatch with fitness tracking and notifications.'
    }
];

app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/products/:productId', (req, res) => {
    const { productId } = req.params;
    const product = products.find(product => `${product.id}` === productId);

    if (product) {
        res.send(product);
    } else {
        res.send('Could not find a product with that id!');
    }
});

app.listen(3000, () => {
    console.log('The Express server is listening on port 3000');
});