const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');
const { validateURL } = require('../utils/helpers');

router.get('/', getArticles);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().custom(validateURL),
      image: Joi.string().required().custom(validateURL),
      owner: Joi.string().alphanum().length(24),
    }),
  }),
  createArticle
);

router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  deleteArticle
);

module.exports = router;
