import { Author as authorModule } from './index.js';

class Author {
  getAll() {
    return authorModule.findAll();
  }

  async getById(id) {
    const author = await authorModule.findByPk(id);
    if (!author) {
      throw new Error('Author not found');
    }
    return author;
  }

  async create(data) {
    const author = await authorModule.create(data);
    return author;
  }

  async update(id, data) {
    const author = await authorModule.findByPk(id);
    if (!author) {
      throw new Error('Author not found');
    }
    await author.update(data);
    return author;
  }

  async delete(id) {
    const author = await authorModule.findByPk(id);
    if (!author) {
      throw new Error('Author not found');
    }
    await author.destroy();
    return author;
  }
}

export default new Author();
