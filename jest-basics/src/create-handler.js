const productUtil = require('./product-util');

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

const createHandler = (req, res) => {
    const { name, price, category, inStock = false } = req.body;

    if (name && price && category) {
        const newProduct = productUtil.createProduct(products, { name, price, category, inStock });
        res.set('Location', '/products/' + newProduct.id);
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
}

module.exports = createHandler;