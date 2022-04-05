const Article = require('../models/article');
const Comment = require('../models/comment');

const home_page = async (req, res, next) => {
    try {
        const articles = await Article.find({}).populate('blogger').sort([['updatedAt', -1], ['createdAt', -1]]);
        return res.status(200).render("home", { title: "Home", articles: articles });
    } catch (error) {
        return next(error);
    }
}

const read_more = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.articleId).populate('blogger').sort([['updatedAt', -1], ['createdAt', -1]]);
        const comments = await Comment.find({ article: req.params.articleId }).populate('blogger').sort([['updatedAt', -1], ['createdAt', -1]]);
        return res.status(200).render('readmore', { title: "Read More", article: article, comments: comments });
    } catch (error) {
        next(error);
    }
}



module.exports = { home_page, read_more };