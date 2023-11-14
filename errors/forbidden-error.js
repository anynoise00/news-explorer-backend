const { messageDefaultForbidden } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message = messageDefaultForbidden) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
