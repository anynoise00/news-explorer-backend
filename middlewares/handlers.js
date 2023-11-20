const {
  messageRequestNotFound,
  messageServerError,
  messageDuplicateResource,
} = require('../utils/constants');

function errorHandler(err, req, res, next) {
  if (!err) {
    next();
    return;
  }

  const error = err;
  if (error.name === 'MongoServerError' && error.code === 11000) {
    error.statusCode = 409;
    error.message = messageDuplicateResource;
  }

  const { statusCode = 500, message } = error;
  res.status(statusCode).send({
    message: statusCode === 500 ? messageServerError : message,
  });
}

function routeNotFound(req, res) {
  res.status(404).json({ message: messageRequestNotFound });
}

module.exports = {
  errorHandler,
  routeNotFound,
};
