import userModule from './index.js';

class User {
  getAll() {
    return userModule.findAll();
  }

  async getOne(id) {
    const user = await userModule.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  create(data) {
    return userModule.create(data);
  }

  async update(id, data) {
    const user = await userModule.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.update(data);
    return user;
  }

  async delete(id) {
    const user = await userModule.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
    return user;
  }
}

export default new User();
