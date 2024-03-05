function triple(x) {
    return x * 3;
}

function caps(str) {
    return str.toUpperCase();
}

function evensOnly(numbers) {
    return numbers.filter(x => x % 2 === 0);
}

module.exports = {
    triple,
    caps,
    evensOnly,
}