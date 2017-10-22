import Photo from '../models/photo'
import logger from '../../../lib/logger'
import moment from 'moment'
import sharp from 'sharp'
import Sequelize from 'sequelize'


exports.addPhoto = async ctx => {
  const uuid = ctx.request.body.uuid
  const location = ctx.request.body.location
  const imageData = ctx.request.body.imageData

  if(!uuid || !location || !imageData ) {
    logger.debug("setting status to 400")
    ctx.response.status = 400
    ctx.body = { error: 'parameters missing'}
    return
  }


  logger.debug("ctx.request.body.imageData.length: ", imageData.length)

  var thumbNail
  try {
    thumbNail = [...await sharp(new Buffer(imageData))
      .resize(100, 100)
      .toBuffer()] // conver to Buffer then babck to Array
    } catch(err) {
      logger.error(err)
    }

    logger.debug("uuid:", uuid)
    logger.debug("location:", location)
    logger.debug("imageData.length:", imageData.length)
    logger.debug("thumbNail.length:", thumbNail.length)

    const createdAt = moment()
    const updatedAt = createdAt



    // create and safe record
    let photo
    try {
      photo = await Photo.create({
        uuid,
        location,
        imageData,
        thumbNail,
        createdAt,
        updatedAt
      })
    } catch(err) {
      logger.error("unable to create Photo", err)
      ctx.response.status = 500
      ctx.body = { error: 'Unable to create a new Photo'}
      return
    }


    // Resond to request indicating the photo was created
    ctx.response.status = 201
    ctx.body = { status: 'success' }
  }


  exports.getPhotoFeed = async ctx => {
    const location = ctx.request.body.location
    if(!location) {
      ctx.response.status = 400
      ctx.body = { error: 'parameters missing'}
      return
    }

    logger.debug("location:",  location)


    const lat       = ctx.request.body.location.coordinates[0]
        , lng       = ctx.request.body.location.coordinates[1];

    const point = Sequelize.fn('ST_MakePoint', lat, lng);


    // retrieve photos
    let photos
    try {

      photos = await Photo.findAll({
        attributes: {
          include: [[Sequelize.fn('ST_Distance', point, Sequelize.col('location')), 'distance']],
          exclude: ['imageData']
        },
        order: Sequelize.col('distance')
      })

    } catch(err) {
      logger.error("Unable to retrieve Photos feed", err)
      ctx.response.status = 500
      ctx.body = { error: 'Unable to retrieve Photos feed'}
      return
    }


    // Resond to request indicating the photo was created
    ctx.response.status = 200
    ctx.body = { status: 'success', photos }
  }
