import Router from 'koa-router'

import indexController from '../src/controllers/index'
import PhotoController from '../src/controllers/photo'
import AbuseReportController from '../src/controllers/abuseReport'
import ContactFormController from '../src/controllers/contactForm'

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
    .post('/api/photos/feed',                  PhotoController.getPhotoFeed)
    .get ('/api/photos/:id',                   PhotoController.getPhotoById)
    .get ('/api/photos/:id/thumb',             PhotoController.getThumbById)
    .delete('/api/photos/:id',                 PhotoController.deletePhotoById)
    .get ('/api/cleanupPhotos',                PhotoController.runCleanup)

    .post('/api/abusereport',                  AbuseReportController.reportAbuse)
    .post('/api/contactform',                  ContactFormController.submitForm)


  app.use(router.routes())
}
