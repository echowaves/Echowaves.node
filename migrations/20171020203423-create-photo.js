'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Photos', {
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
      location: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      thumbNail: {
        allowNull: false,
        type: Sequelize.BLOB
      },
      imageData: {
        allowNull: false,
        type: Sequelize.BLOB
      }
    }
  )
  .then(() => queryInterface.addIndex('Photos', ['uuid']))
  .then(() => queryInterface.addIndex('Photos', ['location']))
  .then(() => queryInterface.addIndex('Photos', ['createdAt']))
  ;
},
down: function(queryInterface, Sequelize) {
  return queryInterface.dropTable('Photos');
}
};
