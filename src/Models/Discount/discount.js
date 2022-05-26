import { Discount as discountModule } from '@models/Discount/index.js';

class Discount {
  create(data) {
    return discountModule.create(data);
  }

  getAll() {
    return discountModule.findAll();
  }

  getOne(discountId) {
    return discountModule.findById(discountId);
  }

  delete(discountId) {
    return discountModule.destroy({
      where: {
        id: discountId,
      },
    });
  }
}

export default new Discount();
