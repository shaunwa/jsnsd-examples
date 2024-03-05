function getProductById(products, id) {
    const product = products.find(p => p.id === id); 
    return product || null;
}

let nextId = 5;

function createProduct(products, newProductData) {
    let newId = nextId;
    let newProduct = { id: newId, ...newProductData };
    products.push(newProduct);
    nextId += 1;
    return newProduct;
}

module.exports = {
    getProductById,
    createProduct,
};