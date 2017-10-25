import logger from '../../../lib/logger'
import assert from 'assert'
import uuid from 'uuid'

// import AbuseReport from '../../src/models/abuseReport'


import app from '../../../server'
import supertest from 'supertest' // SuperAgent-driven library for testing HTTP servers
const expect = require('chai').expect  // BDD/TDD assertion library

const request = supertest.agent(app.listen())


describe('/api/abusereport', () => {

  it('should not be able to post an abuseReport with no parameters',  async ()  => {
    var response =
    await request
      .post('/api/abusereport')
      .set('Content-Type', 'application/json')


    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal('parameters missing')
  })

  it('should be able to post an abusereport with right parameters',  async ()  => {

    let guid = uuid()

    var response =
    await request
      .post('/api/abusereport')
      .set('Content-Type', 'application/json')
      .send({uuid: guid})

    expect(response.status).to.equal(201)
    expect(response.body.status).to.equal('success')
  })

})
