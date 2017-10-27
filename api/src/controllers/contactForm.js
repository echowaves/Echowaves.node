import ContactForm from '../models/contactForm'
import logger from '../../../lib/logger'
import moment from 'moment'
import Sequelize from 'sequelize'


exports.submitForm = async ctx => {
  const uuid = ctx.request.body.uuid
  const description = ctx.request.body.description

  if(!uuid || !description) {
    logger.debug("setting status to 400")
    ctx.response.status = 400
    ctx.body = { error: 'parameters missing'}
    return
  }
  const createdAt = moment()
  const updatedAt = createdAt

  // create and safe record
    let contactForm
    try {
      contactForm = await ContactForm.create({
        uuid,
        description,
        createdAt,
        updatedAt
      })
    } catch(err) {
      logger.error("unable to create contactForm", err)
      ctx.response.status = 500
      ctx.body = { error: 'unable to create contactForm'}
      return
    }


    // Resond to request indicating the create contactForm was created
    ctx.response.status = 201
    ctx.body = { status: 'success' }
  }
