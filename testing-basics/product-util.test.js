const assert = require('assert');
const { getProductById } = require('./product-util');

const products = [{ id: 1 }, { id: 2 }, { id: 3 }];

console.log('The function should return the product with a matching id property');
assert(getProductById(products, 2) === products[1]);
assert(getProductById(products, 3) === products[2]);
console.log('Passed!');

console.log('The function should return null if there is no matching product');
assert(getProductById(products, 4) === null);
console.log('Passed!');