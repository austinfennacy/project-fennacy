'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submittal extends Model {
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
  Submittal.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    submittalNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'submittal number is required' },
        notEmpty: { msg: 'submittal number is required' },
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
    modelName: 'Submittal',
    paranoid: true,
  });
  return Submittal;
};