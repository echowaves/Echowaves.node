import Router from 'koa-router'

import indexController from '../src/controllers/index'
import PhotoController from '../src/controllers/photo'

require('./passportStrategies')

// const passport = require('koa-passport')
const passport = require('./passportStrategies')

const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

module.exports = function (app) {
  const router = new Router()
  app.use(passport.initialize())

  router
    .get('/api',                               indexController.helloWorld) // just for testing purposes, can be used for health check
    // .post('/api/signin', requireSignin,     AuthenticationController.signin)
    // .post('/api/signup',                    AuthenticationController.signup)
    .post('/api/photos',                       PhotoController.addPhoto)
    .get ('/api/photos',                       PhotoController.getPhotoFeed)
    .get ('/api/photos/:id',                   PhotoController.getPhotoById)
    .delete('/api/photos/:id',                 PhotoController.deletePhotoById)

  app.use(router.routes())
}
