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
    addressLine1: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: 'Address Line 1 is required' },
        notEmpty: { msg: 'Address Line 1 is required' },
      },
    },
    addressLine2: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    state: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    zip: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    isMailing: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    isBilling: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Address',
    paranoid: true,
  });
  return Address;
};