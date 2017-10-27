'use strict';

module.exports = {
up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('ContactForms', {
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
    description: {
      type: Sequelize.TEXT,
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
.then(() => queryInterface.addIndex('ContactForms', ['uuid']))
.then(() => queryInterface.addIndex('ContactForms', ['createdAt']))

},

down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('ContactForms');
}
};
