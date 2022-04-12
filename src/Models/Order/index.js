import { DataTypes } from 'sequelize';
import { database } from '@config/database.js';

import { Game } from '../Game';

export const Order = database.define('order', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        defaultValue: 0
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    comment: {
        type: DataTypes.STRING
    },
    prettyCreatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('createdAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
    prettyUpdatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('updatedAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
})

Game.hasMany(Order, {onDelete: 'RESTRICT'})
Order.belongsTo(Game)