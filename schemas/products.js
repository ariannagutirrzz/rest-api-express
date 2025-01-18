const joi = require('joi');

const id = joi.number().integer().positive();
const name = joi.string().min(3).max(255);
const price = joi.number().integer().positive();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
});

const updateProductSchema = joi.object({
  name: name.optional(),
  price: price.optional(),
});

const getProductSchema = joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
