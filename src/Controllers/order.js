import orderModule from '@models/Order/order.js';
//import basketModule from '@models/Basket/basket.js';

import appError from '@errors/appError.js';

class Order {
    adminCreate = async (req, res, next) => {
        await this.create(req, res, next, 'admin')
    }

    userCreate = async (req, res, next) => {
        await this.create(req, res, next, 'user')
    }

    guestCreate = async (req, res, next) => {
        await this.create(req, res, next, 'guest')
    }

    async create(req, { body }, res, next, type) {
        try {
            const user = req.user;
            if (!phone) {
                next(appError.badRequest('Phone not specified'))
            } 
            if (!address) {
                next(appError.badRequest('Address code not specified'))
            } 
            if (!zipCode) {
                next(appError.badRequest('ZIP code not specified'))
            }
            const options = { body, userId: user.id }
            const order = await orderModule.create(options)
            //await basketModule.clear(parseInt(req.signedCookies.basketId))
            res.json(order)
        } catch(e) {
            next(appError.badRequest(e.message))
        }
    }

    async adminGetUser(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя')
            }
            const order = await orderModule.getAll(req.params.id)
            res.json(order)
        } catch(e) {
            next(appError.badRequest(e.message))
        }
    }

    async adminGetOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id заказа')
            }
            const order = await orderModule.getOne(req.params.id)
            res.json(order)
        } catch(e) {
            next(appError.badRequest(e.message))
        }
    }

    async adminDelete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id заказа')
            }
            const order = await orderModule.delete(req.params.id)
            res.json(order)
        } catch(e) {
            next(appError.badRequest(e.message))
        }
    }

    async adminGetAll(req, res, next) {
        try {
            const orders = await orderModule.getAll()
            res.json(orders)
        } catch(e) {
            next(appError.badRequest(e.message))
        }
    }

    async userGetAll(req, res, next) {
        try {
            const user = req.user;
            const orders = await orderModule.getAll(user.id)
            res.status(200).json(orders)
        } catch(e) {
            next(appError.badRequest(e.message))
        }
    }
}

export default new Order()