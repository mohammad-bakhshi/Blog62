const mongoose = require('mongoose');
const fsPromises = require('fs/promises');
const path = require('path');


const Article = require('../models/article');
const Comment = require('../models/comment');
const articleValidation = require('../middlewares/validation/articleValidation');

// render article page
const article_page = (req, res) => {
    return res.status(200).render("addArticle", { title: "Add Article" });
};

//create a new article
const create_article = async (req, res, next) => {
    try {
        const article = {
            title: req.body.title,
            text: req.body.text,
            blogger: req.session.blogger._id
        };
        if (req.file) {
            article.image= req.file.filename;
        }
        await Article.create(article);
        return res.status(200).json({ status: true, message: 'Article was created successfully.' });
    } catch (err) {
        return next(err);
    }
}

//get update page
const update_page = async (req, res, next) => {
    try {
        const articleId = req.params.articleId;
        const article = await Article.findById(articleId);
        return res.status(200).render('updateArticle', { title: 'Update Article', article: article });
    } catch (error) {
        next(error);
    }
}
//edit an article
const update_article = async (req, res, next) => {
    try {
        const article = {
            title: req.body.title,
            text: req.body.text
        };
        if (req.file) {
            article.image = req.file.filename;
            const oldArticle = await Article.findById(req.params.articleId);
            if (oldArticle.image !== 'article.png') {
                await fsPromises.unlink(path.join(__dirname, '../public/images/article', oldArticle.image))
            }
        }
        await Article.findByIdAndUpdate(req.params.articleId, article);
        return res.status(200).json({ result: true, message: "Article was updated successfully." });
    } catch (error) {
        next(error)
    }
}
//delete an article
const delete_article = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.articleId);
        if (article.image !== 'article.png') {
            await fsPromises.unlink(path.join(__dirname, '../public/images/article', article.image))
        }
        await Comment.deleteMany({ article: req.params.articleId });
        await Article.findByIdAndDelete(req.params.articleId);
        return res.status(200).json({ result: true, message: 'article was deleted successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = { article_page, create_article, update_page, update_article, delete_article };