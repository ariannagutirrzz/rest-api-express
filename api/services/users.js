const { faker } = require('@faker-js/faker');

class UsersService {
  constructor() {
    this.users = [];
    this.generate(); // Llamamos al método generate cada vez que se crea una instancia de usersService
  }

  generate() {
    const limit = 10;

    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: i + 1,
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }
  }

  find() {
    return this.users;
  }

  findOne(id) {
    const user = this.users.find(
      (user) => user.id === parseInt(id, 10), // parseInt(id, 10) convierte el 'string' que viene de req.params a un número
    );
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

module.exports = UsersService;
