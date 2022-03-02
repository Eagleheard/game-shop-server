import { Genre as genreModule } from './index.js';

class Genre {
  async getAll() {
    const genre = await genreModule.findAll();
    return genre;
  }

  async getOne(id) {
    const genre = await genreModule.findByPk(id);
    if (!genre) {
      throw new Error('Genre not found');
    }
    return genre;
  }

  async create(data) {
    const genre = await genreModule.create(data);
    return genre;
  }

  async update(id, data) {
    const genre = await genreModule.findByPk(id);
    if (!genre) {
      throw new Error('Genre not found');
    }
    await genre.update(data);
    return genre;
  }

  async delete(id) {
    const genre = await genreModule.findByPk(id);
    if (!genre) {
      throw new Error('Genre not found');
    }
    await genre.destroy();
    return genre;
  }
}

export default new Genre();
