const assert = require('assert');
const expect = require('chai').expect;
const isPrime = require('../src/is-prime');

describe('isPrime()', async () => {
    it('returns false for 0 and 1', () => {
        expect(isPrime(0)).to.be.false;
        expect(isPrime(1)).to.be.false;
    });

    it('Returns false for other numbers that are not prime', () => {
        const notPrimes = [21, 10, 25, 36, 80, 6];
        for (const x of notPrimes) {
            expect(isPrime(x)).to.be.false;
        }
    });

    it('Returns true for numbers we know to be prime', () => {
        const primes = [2, 7, 31, 67, 101, 293];
        for (const x of primes) {
            expect(isPrime(x)).to.be.true;
        }
    });
});