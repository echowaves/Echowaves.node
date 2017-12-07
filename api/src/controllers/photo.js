import Photo from '../models/photo'
import AbuseReport from '../models/abuseReport'

import logger from '../../../lib/logger'
import moment from 'moment'
import sharp from 'sharp'
import Sequelize from 'sequelize'
import {sequelize} from '../../../consts'

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

  var c = await AbuseReport.count({ where: {uuid} })
  logger.debug("count of abuse: " + c)
  if(c > 3){
    ctx.response.status = 401
    ctx.body = { error: 'Anauthorized.'}
    return
  }

  var thumbNail
  try {
    thumbNail = [...await sharp(new Buffer(imageData))
      .resize(150, null)
      .rotate()
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

    var limit = ctx.request.body.limit
    var offset = ctx.request.body.offset
    if(!limit) {
      limit = 100
    }
    if(!offset) {
      offset = 0
    }


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
        order: Sequelize.col('distance'),
        limit,
        offset
      })

      logger.debug("retrived photos: " + photos.length)

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



  exports.getPhotoById = async ctx => {
    const id = ctx.params.id

    // retrieve photos
    let photo
    try {
        photo = await Photo.findOne({
          where: { id }
        })
    } catch(err) {
      logger.error("Unable to retrieve a Photo", err)
      ctx.response.status = 500
      ctx.body = { error: 'Unable to retrieve a Photo'}
      return
    }

    if(!photo) {
      ctx.response.status = 404
      ctx.body = { error: 'not found' }
      return
    }

    // Resond to request indicating the photo was created
    ctx.response.status = 200
    ctx.body = { status: 'success', photo }
  }



  exports.getThumbById = async ctx => {
    const id = ctx.params.id

    // retrieve photos
    let photo
    try {
        photo = await Photo.findOne({
          where: { id },
          attributes:  { exclude: ["imageData"] }
        })
    } catch(err) {
      logger.error("Unable to retrieve a Thumb", err)
      ctx.response.status = 500
      ctx.body = { error: 'Unable to retrieve a Thumb'}
      return
    }

    if(!photo) {
      ctx.response.status = 404
      ctx.body = { error: 'not found' }
      return
    }
    logger.debug("photo length1:")
    logger.debug(JSON.stringify(photo.thumbNail))
    logger.debug("photo length2:" + photo.thumbNail.data.length)

    // Resond to request indicating the photo was created
    // ctx.response.status = 200
    // ctx.response.type = "image/png"
    // ctx.body = new Buffer([...photo.thumbNail.data])
    // ctx.body = { data: [...photo.thumbNail.data] }
    ctx.body = { error: 'not 2 found' }

  }





  exports.deletePhotoById = async ctx => {
    const id = ctx.params.id

    // retrieve photos
    let photo
    try {
        photo = await Photo.destroy({
          where: { id }
        })

    } catch(err) {
      logger.error("Unable to delete a Photo", err)
      ctx.response.status = 500
      ctx.body = { error: 'Unable to delete a Photo'}
      return
    }


    // Resond to request indicating the photo was created
    ctx.response.status = 200
    ctx.body = { status: 'success' }
  }


  exports.runCleanup = async ctx => {
    logger.debug("cleaning up the photos")
    // cleanup photos
    var results = {}
    var rowids = {}
    var count = {}
    try {
        await sequelize.query('DELETE FROM \"AbuseReports\" where \"createdAt\" < NOW() - INTERVAL \'7 days\'')
        rowids = await sequelize.query('select id from (select id from \"Photos\" order by id desc  limit 75) as r order by id limit 1')
        results = await sequelize.query('DELETE FROM \"Photos\" where \"createdAt\" < NOW() - INTERVAL \'24 hours\' and id < ' + rowids[0][0].id)
        count = await sequelize.query('select count(*) FROM \"Photos\"')

    } catch(err) {
      logger.error("Unable to cleanup Photos", err)
      ctx.response.status = 500
      ctx.body = { error: 'Unable to cleanup Photos', err}
      return
    }

    logger.debug("results: " , results)

    // Resond to request indicating the photo was created
    ctx.response.status = 200
    ctx.body =
      {
        status: 'success',
        results,
        rowid: rowids[0][0].id,
        count
      }
  }
