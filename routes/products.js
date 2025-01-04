const ProductsService = require('../services/products');
const express = require('express');
const router = express.Router();

// crear una instancia de ProductsService
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

// router.get('/best-sellers', (req, res) => {
//   const bestSellers = [];

//   for (let i = 0; i < 5; i++) {
//     bestSellers.push({
//       id: i + 1,
//       name: faker.commerce.productName(),
//       price: parseInt(faker.commerce.price()),
//     });
//   }
//   res.json(bestSellers);
// });

router.get('/:id', (req, res) => {
  const { id } = req.params; // req.params es un objeto que contiene los parámetros de la URL como string

  const product = service.findOne(id);
  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;

  const newProduct = service.create(body);
  res.json(newProduct);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const updatedProduct = service.update(id, body);
  res.json(updatedProduct);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedProduct = service.delete(id);
  res.json(deletedProduct);
});

module.exports = router;
