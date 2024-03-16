const notFoundMiddleware = require('./not-found');
const errorHandlerMiddleware = require('./error-handler');
const authenticationMiddleware = require('./authentication'); 

module.exports = {
    notFoundMiddleware,
    errorHandlerMiddleware,
    authenticationMiddleware
}