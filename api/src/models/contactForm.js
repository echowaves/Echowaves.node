import Sequelize from 'sequelize'
import {sequelize} from '../../../consts'
import logger from '../../../lib/logger'

var ContactForm = sequelize.define('ContactForm', {

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

});


// Adding a class level method

// Adding an instance level method

export default ContactForm
