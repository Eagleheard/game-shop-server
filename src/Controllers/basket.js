import jwt from 'jsonwebtoken';

import appError from '@errors/appError.js';

import gameModule from '@models/Game/game.js';
import basketModule from "@models/Basket/basket.js";

class Basket {
    async addGame({ query }, res, next) {
        try {
            const token = req.headers.cookie.split('=')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const game = await gameModule.getOne(query);
            if (!game) {
                next(appError.badRequest('Required quantity does not exist'))
            }
            const options = { ...game, ...user }
            const basket = await basketModule.create(options);
            return res.json(basket);
        } catch (e) {
            next(appError.internalServerError(e.message));
        }
    }

    async getBasket(req, res, next) {
        try {
            const token = req.headers.authorization.split('=')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const basket = await basketModule.getOne({ userId: user.id });
            if (!basket) {
                basket = await basketModule.create();
            }
            return res.json(basket);
        } catch (e) {
            next(appError.internalServerError(e.message));
        }
    }

    async deleteGame(req, res, next) {
        try {
            const {id} = req.params;
            const user = req.user;

            await Basket.findOne({where: {userId: user.id}}).then(async userBasket => {
                if(userBasket.userId === user.id) {
                    await BasketDevice.destroy({where: {basketId: userBasket.id, deviceId: id}})
                }
                return res.json(`You haven't access for delete the game${id}) from basket that didn't belong to you`);
            });
            return res.json("Game deleted form your card");
        } catch (e) {
            next(appError.internalServerError(e.message));
        }
    }
}

export default new Basket();