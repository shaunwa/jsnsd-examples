const createHandler = require('./create-handler');
const productUtil = require('./product-util');

jest.mock('./product-util', () => ({
    createProduct: (_, data) => ({ id: 123, ...data }),
}));

describe('createHandler()', () => {
    test('It sends back a 400 status code when name, price, and category are not all specified', () => {
        const fakeReq = { body: { name: 'Shoes', price: 100.00 } };
        const fakeRes = { sendStatus: () => {} };
        jest.spyOn(fakeRes, 'sendStatus');

        createHandler(fakeReq, fakeRes);

        expect(fakeRes.sendStatus).toHaveBeenCalledWith(400);
    });

    test('It creates a new product and sends back the appropriate response when all data is provided', () => {
        const fakeReq = { body: { name: 'Shoes', price: 100.00, category: 'Clothing' } };
        const fakeRes = {
            set: () => {},
            sendStatus: () => {},
        };
        jest.spyOn(fakeRes, 'set');
        jest.spyOn(fakeRes, 'sendStatus');
        jest.spyOn(productUtil, 'createProduct');

        createHandler(fakeReq, fakeRes);

        expect(productUtil.createProduct).toHaveBeenCalled()
        expect(fakeRes.set).toHaveBeenCalledWith('Location', '/products/123');
        expect(fakeRes.sendStatus).toHaveBeenCalledWith(201);
    })
});