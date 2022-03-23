import { BasketGame as BasketGameModel } from '@models/BasketGame/index.js';
import { Game as GameModel } from '@models/Game/index.js';


class BasketGame {
  create(params) {
    return BasketGameModel.create(params);
  }

  getById(basketId) {
    let basket = BasketGameModel.findByPk(basketId, {
      attributes: ['id'],
      include: [{ model: GameModel, attributes: ['id', 'name', 'price', 'count'] }],
    });
    return basket;
  }

  getAll({where: {basketId: id}}) {  
    const basketArr = [];
    for(let i = 0; i < basket.length; i++) {
        const basketDevice = await GameModel.findOne({
                where: {
                    id: basket[i].gameId,
                },
                include: {
                    model: GameModel, as: "game",
                    required: false}
                });
        basketArr.push(basketDevice);
    return basketArr;
    }
  }
}

export default new BasketGame();
