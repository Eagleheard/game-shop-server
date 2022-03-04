import userModule from './index.js';

class User {
  getAll() {
    return userModule.findAll();
  }

  getOne(id) {
    return userModule.findByPk(id);
  }

  create(data) {
    return userModule.create(data);
  }

  async update(id, data) {
    const user = await userModule.findByPk(id);
    await user.update(data);
    return user;
  }

  async delete(id) {
    const user = await userModule.findByPk(id);
    await user.destroy();
    return user;
  }
}

export default new User();
