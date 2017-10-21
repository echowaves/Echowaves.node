// require('babel-polyfill')
//
// import supertest from 'supertest' // SuperAgent-driven library for testing HTTP servers
// const expect = require('chai').expect  // BDD/TDD assertion library
// import mocha from 'mocha'                     // enable support for generators in mocha tests using co
// import uuid from 'uuid'
// import moment from 'moment'
//
// import logger from '../../../lib/logger'
//
//
//
//
//
//
// process.env.NODE_ENV = 'test'
// const app = require('../../../server')
//
// const request = supertest.agent(app.listen())
//
// var assert = require('assert')
//
//
// describe('/post photo testing', function() {
//
//   it('should not be able to create a photo with missing parameters',  async () => {
//     var response =
//      await request.post('/api/photos')
//     .set('Content-Type', 'application/json')
//     .end()
//
//     logger.debug("response: ", response.status)
//
//     // expect(response.status).to.equal(400, response.text)
//     // expect(response.body).to.contain.keys('error')
//     expect(response.body.error).to.equal('parameters missing')
//   })
//
//
//
//
// })
