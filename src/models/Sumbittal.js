'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Submittal extends Model {
    static associate(models) {
      Submittal.hasOne(models.Address, { as: 'architectAddress' });
      Submittal.hasOne(models.Address, { as: 'contractorAddress' });
      Submittal.hasOne(models.Address, { as: 'projectAddress' });
    }

    toJSON() {
      return {...this.get(), 
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined 
      }
    }

    getSubmittalAcceptable() {
      // base on whether or not the submittal has NET, NETw/MN then yes,
      // if AR, Rejected then no
      return false;
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
    specificationNumber: {
      type: DataTypes.INTEGER,
    },
    specificationSection: {
      type: DataTypes.INTEGER,
    },
    ahjRequired: {
      type: DataTypes.BOOLEAN,
    },
    ahjApproved: {
      type: DataTypes.BOOLEAN,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: 'description is required' },
        notEmpty: { msg: 'description is required' },
      },
    },
    subcontractorSupplier: {
      type: DataTypes.STRING,
    },
    dateReceived: {
      type: DataTypes.DATEONLY,
    },
    numberReceived: {
      type: DataTypes.STRING,
    },
    respondBefore: {
      type: DataTypes.DATEONLY,
    },
    responseDate: {
      type: DataTypes.DATEONLY,
    },
    // status: {
    //   //some kind of enum, not sure
    // },
    projectNumber: {
      type: DataTypes.INTEGER,
    },
    projectName: {
      type: DataTypes.STRING,
    },
    supplierName: {
      type: DataTypes.STRING,
    },
    isSubstitutionUsed: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Submittal',
    paranoid: true,
  });
  return Submittal;
};