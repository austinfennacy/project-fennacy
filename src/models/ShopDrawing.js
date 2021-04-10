'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopDrawing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
  ShopDrawing.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    shopDrawingNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'shop drawing number is required' },
        notEmpty: { msg: 'shop drawing number is required' },
      },
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: 'description is required' },
        notEmpty: { msg: 'description is required' },
      },
    },
  }, {
    sequelize,
    modelName: 'ShopDrawing',
    paranoid: true,
  });
  return ShopDrawing;
};