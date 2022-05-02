import userModule from './index.js';

class User {
  getAll() {
    return userModule.findAll();
  }

  getById(id) {
    return userModule.findByPk(id);
  }

  getOne(data) {
    return userModule.findOne(data);
  }

  create(data) {
    return userModule.create(data);
  }

  async update({ userId, photo }) {
    await userModule.update(
      {
        photo,
      },
      {
        where: {
          id: userId,
        },
      },
    );
    return await userModule.findByPk(userId);
  }

  async delete(id) {
    const user = await userModule.findByPk(id);
    await user.destroy();
    return user;
  }
}

export default new User();
