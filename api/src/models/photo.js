import Sequelize from 'sequelize'
import {sequelize} from '../../../consts'
import logger from '../../../lib/logger'

var Photo = sequelize.define('Photo', {

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
  updatedAt: {
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

});


// Adding a class level method

// Adding an instance level method

export default Photo
