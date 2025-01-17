const { faker } = require('@faker-js/faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate(); // Llamamos al método generate cada vez que se crea una instancia de ProductsService
  }

  async generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        // id: faker.string.uuid(),
        id: i + 1,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        isOffer: faker.datatype.boolean(),
      });
    }
  }

  async create(body) {
    // Obtenemos el id del body para poder validar (tambien se puede hacer destructuring para obtener otras propiedades, como name, price, etc)
    const { id } = body;

    // Validando si el producto ya existe
    const existingProduct = this.products.find(
      (product) => product.id === parseInt(id, 10), // parseInt(id, 10) convierte el 'string' que viene de req.params a un número
    );

    if (existingProduct) {
      throw new Error('Product already exists');
    }
    // Si el producto no existe, lo creamos
    const newProduct = {
      id: faker.string.uuid(),
      ...body,
    };

    // Agregamos el nuevo producto al array
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    console.log('Product id:', id);
    const product = this.products.find(
      (product) => product.id === parseInt(id, 10), // parseInt(id, 10) convierte el 'string' que viene de req.params a un número
    );
    console.log('Product found:', product);

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.isOffer) {
      product.price = product.price * 0.8;
      console.log('Product is on offer!');
    }

    return product;
  }

  async update(id, body) {
    // Validando si el producto existe
    const index = this.products.findIndex(
      (product) => product.id === parseInt(id, 10),
    );
    // Si el producto no existe, lanzamos un error
    if (index === -1) {
      throw new Error('Product not found');
    }

    // Si el producto existe, actualizamos sus propiedades usando el spread operator para conservar las propiedades que no se están actualizando
    this.products[index] = {
      ...this.products[index],
      ...body,
    };
    return this.products[index];
  }

  async delete(id) {
    // Validando si el producto existe
    const index = this.products.findIndex(
      (product) => product.id === parseInt(id, 10),
    );
    // Si el producto no existe, lanzamos un error
    if (index === -1) {
      throw new Error('Product not found');
    }
    // Si el producto existe, lo eliminamos usando el metodo splice e indicando el index del producto a eliminar, junto con la cantidad de elementos a eliminar (en este caso solo 1)
    this.products.splice(index, 1);
    return { id, message: 'Product deleted' };
  }
}

module.exports = ProductsService;
