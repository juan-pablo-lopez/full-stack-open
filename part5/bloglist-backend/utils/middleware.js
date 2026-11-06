const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:  ', request.method)
  logger.info('Path:    ', request.path)
  logger.info('Payload: ', request.body || '')
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Requested resource was not found.' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Bad Request: unknown Id format.' })
  } else if (error.name === 'ValidationError') {
    const errorMessages = Object.values(error.errors).map(error => error.message)
    return response.status(400).json({ error: errorMessages })
  } else if (error.name === 'MongoServerError' && error.message.includes('duplicate key error')) {
    return response.status(400).json({ error: 'Expected `username` to be unique.' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token.' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  try{
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.replace('Bearer ', '')
      request.token = token
    }
    next()
  } catch (error) {
    return response.status(401).json({ error: error.message })
  }
}

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Invalid token.' })
    }
    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
  } catch (error) {
    return response.status(401).json({ error: error.message })
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
