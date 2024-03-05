const { expect } = require('chai');
const { triple, caps, evensOnly } = require('../src/chai-demo');

describe('Demonstrating chai\'s assertion capabilities', () => {
    it('Returns the argument tripled', () => {
        expect(triple(5)).to.be.a('number');
        expect(triple(5)).to.equal(15);
        expect(triple(7)).to.equal(21);
        expect(triple(100)).to.equal(300);
    });

    it('Returns the string all in uppercase', () => {
        expect(caps('hello')).to.be.a('string');
        expect(caps('hello')).to.equal('HELLO');
        expect(caps('goodbye')).to.equal('GOODBYE');
    });

    it('Returns an array containing only the even numbers', () => {
        expect(evensOnly([1, 2, 3, 4, 5, 6])).to.deep.equal([2, 4, 6]);
        expect(evensOnly([10, 5, 7, 12, 108])).to.deep.equal([10, 12, 108]);
    });
});