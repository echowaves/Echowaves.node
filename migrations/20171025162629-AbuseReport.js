'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AbuseReport', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }
  )
  .then(() => queryInterface.addIndex('AbuseReport', ['uuid']))
  .then(() => queryInterface.addIndex('AbuseReport', ['createdAt']))

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AbuseReport');
  }
};
