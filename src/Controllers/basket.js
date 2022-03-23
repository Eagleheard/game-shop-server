import jwt from 'jsonwebtoken';

import appError from '@errors/appError.js';

import BasketModule from "@models/Basket/basket.js";
import BasketGameModule from "@models/BasketGame/basketGame.js";

class Basket {
    async addGame(req, res, next) {
        try {
            const {id} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const basket = await BasketModule.getById({where: {userId: user.id}});
            await BasketGameModule.create({basketId : basket.id, deviceId: id});
            return res.json("Game added in card");
        } catch (e) {
            next(appError.internalServerError(e.message));
        }
    }

    async getGames(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const {id} = await BasketModule.getOne({where: {userId: user.id}});
            const basket = await BasketGameModule.getAll({where: {basketId: id}});
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