const assert = require('assert');
const isPrime = require('./is-prime');

console.log('Testing to make sure that 0 and 1 are not prime');
assert(isPrime(0) === false);
assert(isPrime(1) === false);

console.log('Testing a few other numbers here that we know are not prime');
const notPrimes = [21, 10, 25, 36, 80, 6];
for (const x of notPrimes) {
    assert(isPrime(x) === false);
}

console.log('Testing some numbers that we know are prime');
const primes = [2, 7, 31, 67, 101, 293];
for (const x of primes) {
    console.log('Testing ' + x);
    assert(isPrime(x) === true);
}