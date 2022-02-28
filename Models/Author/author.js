import { Author as authorModule } from './index.js';

class Author {
  async getAll() {
    const author = await authorModule.findAll();
    return author;
  }

  async getOne(id) {
    const author = await authorModule.findByPk(id);
    if (!author) {
      throw new Error('Author not found');
    }
    return author;
  }

  async create({ name, image, location, description }) {
    const author = await authorModule.create({ name, image, location, description });
    return author;
  }

  async update(id, { name, image, location, description }) {
    const author = await authorModule.findByPk(id);
    if (!author) {
      throw new Error('Author not found');
    }
    await author.update({ name, image, location, description });
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
