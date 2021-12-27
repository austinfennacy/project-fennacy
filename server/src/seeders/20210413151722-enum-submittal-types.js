'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Submittals', [{
      id: uuidv4(),
      submittalNumber: '42',
      description: 'The answer to life',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      submittalNumber: '1',
      description: 'First Submittal Entry',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      submittalNumber: '2',
      description: 'Second',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete('Submittals', null, {});
  }
};
