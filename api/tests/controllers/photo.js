process.env.NODE_ENV = 'test'

import logger from '../../../lib/logger'
import assert from 'assert'


import app from '../../../server'
import supertest from 'supertest' // SuperAgent-driven library for testing HTTP servers
const expect = require('chai').expect  // BDD/TDD assertion library

const request = supertest.agent(app.listen())

describe('/api/photos', () => {

  it('should not be able to post a photo with no parameters',  async ()  => {
    var response =
    await request
      .post('/api/photos')
      .set('Content-Type', 'application/json')


    logger.debug("response.status: ", response.status)
    logger.debug("response.body  : ", response.body)


    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal('parameters missing')


  })

})
