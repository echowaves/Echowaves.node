import logger from '../../../lib/logger'
import assert from 'assert'
import uuid from 'uuid'



import app from '../../../server'
import supertest from 'supertest' // SuperAgent-driven library for testing HTTP servers
const expect = require('chai').expect  // BDD/TDD assertion library

const request = supertest.agent(app.listen())


describe('/api/contactform', () => {

  it('should not be able to post an contactForm with no parameters',  async ()  => {
    var response =
    await request
      .post('/api/contactform')
      .set('Content-Type', 'application/json')


    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal('parameters missing')
  })

  it('should be able to post an contactForm with right parameters',  async ()  => {
    let guid = uuid()
    let description = "test contact form"
    var response =
    await request
      .post('/api/contactform')
      .set('Content-Type', 'application/json')
      .send({uuid: guid})
      .send({description})

    expect(response.status).to.equal(201)
    expect(response.body.status).to.equal('success')
  })




})
