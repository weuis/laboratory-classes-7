const express = require('express');
const { mongoConnect } = require('./database');
const Product = require('./models/Product');
const Cart = require('./models/Cart');

const app = express();
app.use(express.json());

app.post('/products', (req, res) => {
  const { name, price } = req.body;
  const product = new Product(name, price);
  product.save()
      .then(() => res.status(201).json({ message: 'Product has been added!' }))
      .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/products', (req, res) => {
  Product.fetchAll()
      .then(products => res.json(products))
      .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/cart/:userId', (req, res) => {
  Cart.getCart(req.params.userId)
      .then(cart => {
        if (cart) {
          res.json(cart);
        } else {
          res.status(404).json({ message: 'Cart not found.' });
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/cart/:userId', (req, res) => {
  const cart = new Cart(req.params.userId);
  cart.addItem(req.body)
      .then(() => res.status(200).json({ message: 'Product has been added to the cart.' }))
      .catch(err => res.status(500).json({ error: err.message }));
});

mongoConnect(() => {
  app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
  });
});
