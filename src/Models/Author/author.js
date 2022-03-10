import { Author as authorModule } from './index.js';

class Author {
  getAll() {
    return authorModule.findAll();
  }

  getById(id) {
    return authorModule.findByPk(id);
  }

  create(data) {
    return authorModule.create(data);
  }

  async update(id, data) {
    const author = await authorModule.findByPk(id);
    await author.update(data);
    return author;
  }

  async delete(id) {
    const author = await authorModule.findByPk(id);
    await author.destroy();
    return author;
  }
}

export default new Author();
