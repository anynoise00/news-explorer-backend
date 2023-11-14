const { defaultNotFoundMsg } = require('../utils/errorMessages');

class ResourceNotFoundError extends Error {
  constructor(message = defaultNotFoundMsg) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = ResourceNotFoundError;
