const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/new-route', (req, res) => {
  res.send('This is a new route');
});

app.get('/products', (req, res) => {
  res.json({
    products: [
      {
        id: 1,
        name: 'Product 1',
      },
      {
        id: 2,
        name: 'Product 2',
      },
    ],
  });
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  // res.send(`You requested to see an item with the id: ${id}`);
  res.send({
    id,
    name: `Product ${id}`,
  });
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.send(`Category: ${categoryId}, Product: ${productId}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
