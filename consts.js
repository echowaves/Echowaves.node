import logger from './lib/logger'

import Sequelize from 'sequelize'

export var sequelize = new Sequelize(`${process.env.DATABASE_URL}`)

sequelize
  .authenticate()
  .then(function(err) {
    logger.info('Connection to database has been established successfully.')
  })
  .catch(function (err) {
    logger.info('Unable to connect to the database:', err)
  })
