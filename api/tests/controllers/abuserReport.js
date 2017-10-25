import logger from '../../../lib/logger'
import assert from 'assert'
import uuid from 'uuid'
import fs from 'fs'

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



  it('should not be able to post a photo wben too many abuses reported',  async ()  => {
    let guid = uuid()

    var point = { type: 'Point', coordinates: [39.807222,-76.984722]};
    var contents = [...fs.readFileSync('./api/tests/controllers/data/FooBuz.png')]

    logger.debug("contents.size: ", contents.length)


//post 4 abuse reports for a particular UUID
    await request
    .post('/api/abusereport')
    .set('Content-Type', 'application/json')
    .send({uuid: guid})
    await request
    .post('/api/abusereport')
    .set('Content-Type', 'application/json')
    .send({uuid: guid})
    await request
    .post('/api/abusereport')
    .set('Content-Type', 'application/json')
    .send({uuid: guid})
    await request
    .post('/api/abusereport')
    .set('Content-Type', 'application/json')
    .send({uuid: guid})


    var response =
    await request
      .post('/api/photos')
      .set('Content-Type', 'application/json')
      .send({uuid: guid})
      .send({location: point})
      .send({imageData: contents})

    expect(response.status).to.equal(401)
    expect(response.body.error).to.equal('Anauthorized.')


  })

})
