const logger = require('./logger')

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

    return response.status(400).json({
      error: errorMessages
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
