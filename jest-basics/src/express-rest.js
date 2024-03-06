const express = require('express');
const app = express();
const { getProductById } = require('./product-util');
const createHandler = require('./create-handler');

app.use(express.json());

let products = [{
    id: 1,
    name: "Ultra HD Television",
    price: 799.99,
    category: "Electronics",
    inStock: true
},
{
    id: 2,
    name: "Bluetooth Speaker",
    price: 29.99,
    category: "Electronics",
    inStock: true
},
{
    id: 3,
    name: "Espresso Machine",
    price: 199.99,
    category: "Kitchen Appliances",
    inStock: false
},
{
    id: 4,
    name: "Electric Toothbrush",
    price: 49.99,
    category: "Personal Care",
    inStock: true
},
{
    id: 5,
    name: "Gaming Laptop",
    price: 1499.99,
    category: "Computers",
    inStock: false
}];

// Listing & Searching (all instances)
app.get('/products', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        return res.json(products);
    }

    const allowedFilters = [
        { name: 'category', abbrev: 'c', type: String },
        { name: 'inStock', abbrev: 'is', type: Boolean },
    ];

    const filteredProducts = products.filter(product =>
        Object.keys(req.query)
            .filter(key => allowedFilters.some(filter => filter.abbrev === key))
            .every(key => {
                const filterForKey = allowedFilters.find(filter => filter.abbrev === key);
                const propertyName = filterForKey.name;
                return product[propertyName] === filterForKey.type(req.query[key]);
            })
    );

    res.json(filteredProducts);
});

// Reading (single instance)
app.get('/products/:productId', (req, res) => {
    const { productId } = req.params;
    const product = getProductById(products, Number(productId));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'There is no product with the id ' + productId });
    }
});

// Creating
app.post('/products', createHandler);

app.delete('/products/:productId', (req, res) => {
    const { productId } = req.params;

    products = products.filter(product => product.id !== Number(productId));

    res.sendStatus(204);
});

app.patch('/products/:productId', (req, res) => {
    const { productId } = req.params;
    const updateableProperties = ['name', 'price', 'category', 'inStock'];

    const product = products.find(product => product.id === Number(productId));
    
    for (const up of updateableProperties) {
        if (req.body[up] !== undefined) {
            product[up] = req.body[up];
        }
    }

    res.json(product);
});

app.put('/products/:productId', (req, res) => {
    const { productId } = req.params; 

    let updatedProduct;

    products = products.map(product => {
        if (product.id === Number(productId)) {
            updatedProduct = { id: product.id, ...req.body };
            return updatedProduct;
        } else {
            return product;
        }
    });

    res.json(updatedProduct);
});

app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});
