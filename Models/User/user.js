import userModule from './index.js';

class User {
  async getAll() {
    const users = await userModule.findAll();
    return users;
  }

  async getOne(id) {
    const user = await userModule.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async create(data) {
    const { email, password, role } = data;
    const user = await userModule.create({ email, password, role });
    return user;
  }

  async update(id, data) {
    const user = await userModule.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    const { email = user.email, password = user.password, role = user.role } = data;
    await user.update({ email, password, role });
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
