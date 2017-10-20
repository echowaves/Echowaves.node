const passport = require('koa-passport')
import logger from '../../lib/logger'
import User from '../src/models/user'

var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

var LocalStrategy = require('passport-local')

// Create local Strategy
const localOptions = { usernameField: 'email'}
const localLogin = new LocalStrategy(localOptions, async(email, password, done) => {
  // Verify this email and password, call done with the username
  // if it is a correct email and password
  // otherwise, call done with false
  let user
  try {
    user = await User.findByEmail(email)
  } catch(err) {
    logger.error("failed Local Strategy: ", err)
    return done(err)
  }
  if(!user) {
    logger.error("failed Local Strategy, user not found")
    return done(null, false)
  }

  //compare passwords - is 'password' equal user.password?
  let isMatch = await user.comparePassword(password)
  if(!isMatch) { return done(null, false) }

  return done(null, user)
})


// Set up options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.FBUZZ_JWT_SECRET
}

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, async(payload, done) => {
  logger.debug("payload: ", payload)
  // See if the user email in the payload exists in our database
  // If it does, call 'done' with that user
  //Otherwise, call dobe without a user object
  logger.debug("payload.sub: ", payload.sub)

  try {
    let user = await User.findByEmail(payload.sub)
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  } catch (err) {
    logger.error("failed JWT Strategy: ", err)
    return done(err)
  }
})

// Tell passport to use this Strategy
passport.use(jwtLogin)
passport.use(localLogin)
// export default jwtLogin
module.exports = passport
