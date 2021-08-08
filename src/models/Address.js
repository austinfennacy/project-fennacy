'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
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
  Address.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    addressNameLine: {
      type: DataTypes.STRING,
    },
    addressLine1: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: 'Address Line 1 is required' },
        notEmpty: { msg: 'Address Line 1 is required' },
      },
    },
    addressLine2: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Address',
    paranoid: true,
  });
  return Address;
};