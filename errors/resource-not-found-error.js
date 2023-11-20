const { messageDefaultNotFound } = require('../utils/constants');

class ResourceNotFoundError extends Error {
  constructor(message = messageDefaultNotFound) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = ResourceNotFoundError;
