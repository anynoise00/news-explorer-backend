const Article = require('../models/article');

const ResourceNotFoundError = require('../errors/resource-not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  messageArticleSaved,
  messageArticleNotFound,
  messageArticleDeletePermission,
  messageArticleDeleted,
} = require('../utils/constants');

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
    .then((article) =>
      res.status(201).send({ message: messageArticleSaved, data: article })
    )
    .catch(next);
}

function deleteArticle(req, res, next) {
  const { id } = req.params;

  Article.findById(id)
    .orFail(new ResourceNotFoundError(messageArticleNotFound))
    .then((article) => {
      if (!article.owner.equals(req.user._id))
        throw new ForbiddenError(messageArticleDeletePermission);

      Article.deleteOne(article).then((data) =>
        res.send({ message: messageArticleDeleted })
      );
    })
    .catch(next);
}

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
