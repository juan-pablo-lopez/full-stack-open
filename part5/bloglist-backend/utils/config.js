let PORT = process.env.PORT || 3003

let MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
let MONGODB_PWD = MONGODB_URI.replace('${password}', process.env.MONGODB_PWD)

module.exports = { MONGODB_URI, MONGODB_PWD, PORT }
