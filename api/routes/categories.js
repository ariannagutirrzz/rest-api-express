const CategoriesService = require('../services/categories');
const express = require('express');
const { faker } = require('@faker-js/faker');

const service = new CategoriesService();
const router = express.Router();

router.get('/', (req, res) => {
  const { limit } = req.query;
  const categories = service.getCategories(limit);
  res.json(categories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.getCategory(id);
  res.json(category);
});

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  const product = service.getProductFromCategory(categoryId, productId);
  res.json(product);
});

module.exports = router;
