import Sequelize from 'sequelize'
import {sequelize} from '../../../consts'
import logger from '../../../lib/logger'
import bcrypt from 'bcrypt-as-promised'

var User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  hooks: {
    afterValidate: async(user, options) => {
      logger.debug("after validate hashing user.password")
      let hashed_password  = await bcrypt.hash(user.password, 10)
      user.password = hashed_password
    }
  }
});


// Adding a class level method
User.findByEmail = async email => {
  return await User.findOne({
    where: {
      email:email
    }
  })
}

// Adding an instance level method
User.prototype.comparePassword = async function(candidatePassword) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password)
    logger.debug("there is a match: ", isMatch)
    return isMatch
  } catch(err) {
    logger.debug("failed to match the passwords: ", err)
  }
  return false
}

export default User
