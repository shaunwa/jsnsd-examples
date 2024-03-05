function isPrime(x) {
    if (x <= 2) return false;
    for (let i = 2; i <= Math.sqrt(x); i++) {
        if (x % i === 0) return false;
    }
    return true;
}

module.exports = isPrime;