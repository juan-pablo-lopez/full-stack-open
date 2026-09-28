let MONGODB_URI = process.env.MONGODB_URI
let MONGODB_PWD = MONGODB_URI.replace('${password}', process.env.MONGODB_PWD)
let PORT = process.env.PORT || 3003

module.exports = { MONGODB_URI, MONGODB_PWD, PORT }
