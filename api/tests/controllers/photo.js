import logger from '../../../lib/logger'
import assert from 'assert'
import uuid from 'uuid'
import fs from 'fs'


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


    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal('parameters missing')
  })


  it('should be able to post a photo with right parameters',  async ()  => {

    let guid = uuid()
    var point = { type: 'Point', coordinates: [39.807222,-76.984722]};
    var contents = [...fs.readFileSync('./api/tests/controllers/data/FooBuz.png')]

    logger.debug("contents.size: ", contents.length)

    var response =
    await request
      .post('/api/photos')
      .set('Content-Type', 'application/json')
      .send({uuid: guid})
      .send({location: point})
      .send({imageData: contents})

    expect(response.status).to.equal(201)
    expect(response.body.status).to.equal('success')
  })

  it('should not be able to get a photo feed with no parameters',  async ()  => {
    var response =
    await request
      .get('/api/photos')
      .set('Content-Type', 'application/json')


    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal('parameters missing')
  })


  it.only('should be able to query feed photos',  async ()  => {
    var point = { type: 'Point', coordinates: [38.80,-77.98]};

    var response =
    await request
      .get('/api/photos')
      .set('Content-Type', 'application/json')
      .send({location: point})

    expect(response.status).to.equal(200)
    expect(response.body.status).to.equal('success')

    logger.debug("photos: ", response.body.photos.length)
    // logger.debug("photos: ", response.body.photos[0])
  })


  it('should be able to get one photo by id',  async ()  => {
  })

  it('should be able to delete a photo by id',  async ()  => {
  })

})
