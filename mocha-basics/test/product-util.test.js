const { expect } = require('chai');
const { getProductById, createProduct } = require('../src/product-util');

const products = [{ id: 1 }, { id: 2 }, { id: 3 }];

describe('getProductById()', () => {
    it('returns the product with a matching id property', () => {
        expect(getProductById(products, 2)).to.deep.equal({ id: 2 });
        expect(getProductById(products, 3)).to.equal(products[2]);
    });

    it('returns null if there is no matching product', () => {
        expect(getProductById(products, 4)).to.be.null;
    });
})

describe('createProduct()', () => {
    it('creates a new product with the given data', () => {
        const newProduct = createProduct(products, { name: 'Shoes', price: 10.99 });
        expect(newProduct).to.have.property('id').that.is.a('number');
        expect(products).to.include(newProduct);
    });
});