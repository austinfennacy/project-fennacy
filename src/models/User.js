'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }

    toJSON() {
      return {...this.get(),
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined
      }
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    passwordHash: {
      type: DataTypes.STRING,
    },
    lastLoginAt: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });
  return User;
};
