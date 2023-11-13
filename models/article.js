const mongoose = require('mongoose');
const { schemaUrlValidator } = require('../utils/helpers');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: schemaUrlValidator,
  },
  image: {
    type: String,
    required: true,
    validate: schemaUrlValidator,
  },
  owner: {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
});

module.exports = mongoose.model('article', articleSchema);
