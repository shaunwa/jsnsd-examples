let nextId = 125;

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

module.exports.listProducts = (req, res) => {
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
}

module.exports.getProductById = (req, res) => {
    const { productId } = req.params;
    const product = products.find(p => p.id === Number(productId));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'There is no product with the id ' + productId });
    }
}

module.exports.createProduct = (req, res) => {
    const { id, name, price, category, inStock } = req.body;

    if (name && price && category) {
        let newId = nextId;
        let newProduct = { id: newId, name, price, category, inStock: !!inStock };
        products.push(newProduct);
        nextId += 1;
        res.set('Location', '/products/' + newId);
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
}

module.exports.deleteProduct = (req, res) => {
    const { productId } = req.params;

    products = products.filter(product => product.id !== Number(productId));

    res.sendStatus(204);
}

module.exports.patchProduct = (req, res) => {
    const { productId } = req.params;
    const updateableProperties = ['name', 'price', 'category', 'inStock'];

    const product = products.find(product => product.id === Number(productId));
    
    for (const up of updateableProperties) {
        if (req.body[up] !== undefined) {
            product[up] = req.body[up];
        }
    }

    res.json(product);
}

module.exports.replaceProduct = (req, res) => {
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
}