const { faker } = require('@faker-js/faker');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 5;

    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: i + 1,
        name: faker.commerce.productAdjective(),
      });
    }
  }

  getCategories(limit) {
    if (!limit) {
      return this.categories;
    }

    if (limit) {
      return this.categories.slice(0, limit);
    }
  }

  getCategory(id) {
    // Number(id) is used to convert the id string
    return this.categories.find((category) => category.id === Number(id));
  }

  getProductFromCategory(categoryId, productId) {
    return `Category: ${categoryId}, Product: ${productId}`;
  }
}

module.exports = CategoriesService;
