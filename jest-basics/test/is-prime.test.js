const isPrime = require('../src/is-prime');

describe('isPrime()', () => {
    test('Returns true if the number is prime', () => {
        expect(isPrime(7)).toBe(true);
        expect(isPrime(31)).toBe(true);
    });

    test('Returns false if the number is not prime', () => {
        expect(isPrime(20)).toBe(false);
        expect(isPrime(100)).toBe(false);
    });
});