process.env.NODE_ENV = 'test'

import logger from '../../../lib/logger'
import assert from 'assert'


import app from '../../../server'
import supertest from 'supertest' // SuperAgent-driven library for testing HTTP servers
const expect = require('chai').expect  // BDD/TDD assertion library

const request = supertest.agent(app.listen())

describe('/api', () => {

  it('should be able respond to a health check',  async ()  => {
    var response =
    await request
      .get('/api')
      .set('Content-Type', 'application/json')

    expect(response.status).to.equal(200)
    expect(response.body.message).to.equal('Hello Echowaves World')


  })

})
