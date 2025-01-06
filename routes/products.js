const ProductsService = require('../services/products');
const express = require('express');
const router = express.Router();

// crear una instancia de ProductsService
const service = new ProductsService();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
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

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params; // req.params es un objeto que contiene los parámetros de la URL como string
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;

    const newProduct = await service.create(body);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedProduct = await service.update(id, body);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await service.delete(id);
    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
