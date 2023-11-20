const validator = require('validator');
const { rateLimit } = require('express-rate-limit');

const urlRegex = /http[s]?:\/\/(www\.)?.+(\.).+(\/.)*\/?/i;

const schemaUrlValidator = {
  validator: (v) => urlRegex.test(v),
  message: (props) => `${props.value} is not a valid link.`,
};

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

module.exports = {
  schemaUrlValidator,
  validateURL,
  rateLimiter,
};
