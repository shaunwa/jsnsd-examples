function getProductById(products, id) {
    const product = products.find(p => p.id === id); 
    return product || null;
}

module.exports = {
    getProductById,
};