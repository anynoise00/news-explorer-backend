const Article = require('../models/article');

const ResourceNotFoundError = require('../errors/resource-not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

function getArticles(req, res, next) {
  Article.find({ owner: req.user._id })
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
    .then((Article) => res.send({ data: Article }))
    .catch(next);
}

function deleteArticle(req, res, next) {
  const { id } = req.params;

  Article.findById(id)
    .orFail(
      new ResourceNotFoundError('O artigo solicitado não foi encontrado.')
    )
    .then((Article) => {
      if (!Article.owner.equals(req.user._id))
        throw new ForbiddenError(
          'Você não tem permissão para deletar artigos de outros usuários.'
        );
      Article.deleteOne(Article).then((data) => res.send({ data }));
    })
    .catch(next);
}

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
