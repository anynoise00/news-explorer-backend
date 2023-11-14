const Article = require('../models/article');

const ResourceNotFoundError = require('../errors/resource-not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  articleNotFoundMsg,
  articleDeletePermissionMsg,
} = require('../utils/errorMessages');

function getArticles(req, res, next) {
  Article.find({})
    .sort({ createdAt: -1 })
    .orFail(new ResourceNotFoundError())
    .then((articles) => res.send(articles))
    .catch(next);
}

function createArticle(req, res, next) {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
}

function deleteArticle(req, res, next) {
  const { id } = req.params;

  Article.findById(id)
    .orFail(new ResourceNotFoundError(articleNotFoundMsg))
    .then((article) => {
      if (!article.owner.equals(req.user._id))
        throw new ForbiddenError(articleDeletePermissionMsg);

      Article.deleteOne(article).then((data) => res.send({ data }));
    })
    .catch(next);
}

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
