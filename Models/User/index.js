import { DataTypes } from 'sequelize';
import { database } from '../../Config/database.js';

const User = database.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
    photo: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
  });

export default User;