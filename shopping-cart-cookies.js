const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post('/cart', (req, res) => {
    const { id } = req.body;

    if (!req.cookies.cart) { 
        const newCart = [{ id, q: 1 }];
        res.cookie('cart', JSON.stringify(newCart));
    } else {
        const cartRaw = req.cookies.cart;
        const cart = JSON.parse(cartRaw);
        console.log(cart);
        const existingEntry = cart.find(item => item.id === id);

        if (existingEntry) {
            existingEntry.q += 1;
        } else {
            cart.push({ id, q: 1 });
        }

        res.cookie('cart', JSON.stringify(cart));
    }

    res.send(`Added item with id ${id} to cart!`);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});