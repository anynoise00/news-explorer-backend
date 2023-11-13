const urlRegex = /http[s]?:\/\/(www\.)?.+(\.).+(\/.)*\/?/i;

const schemaUrlValidator = {
  validator: (v) => urlRegex.test(v),
  message: (props) => `${props.value} is not a valid link.`,
};

module.exports = {
  schemaUrlValidator,
};
