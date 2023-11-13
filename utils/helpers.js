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

module.exports = {
  schemaUrlValidator,
  validateURL,
};
