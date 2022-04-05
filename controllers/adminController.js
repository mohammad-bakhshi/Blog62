const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const fsPromises = require('fs/promises');
const path = require('path');

const Blogger = require("../models/blogger");
const Article = require('../models/article');
const Comment = require('../models/comment');


const profile_page = async (req, res, next) => {
    try {
        const bloggers = await Blogger.find({ role: 'Blogger' }, { password: 0, role: 0, avatar: 0 }).sort([['updatedAt', -1], ['createdAt', -1]]);
        const articles = await Article.find({}, { image: 0 }).populate('blogger', { username: 1 }).sort([['updatedAt', -1], ['createdAt', -1]]);
        const comments = await Comment.find({}).populate('blogger', { username: 1 }).sort([['updatedAt', -1], ['createdAt', -1]]);
        return res.status(200).render("adminPanel", { title: "Admin Profile", bloggers: bloggers, articles: articles, comments: comments });
    } catch (error) {
        next(error)
    }
}

const reset_password = async (req, res, next) => {
    try {
        const bloggerID = req.params.bloggerId;
        const blogger = await Blogger.findById(bloggerID);
        const salt = await bcrypt.genSalt(10);
        hash = await bcrypt.hash(blogger.firstname + blogger.lastname, salt);
        await Blogger.findByIdAndUpdate(bloggerID, { password: hash });
        return res.status(200).redirect('/admin/profile');
    }
    catch (error) {
        next(error)
    }
}

const delete_blogger = async (req, res, next) => {
    try {
        const bloggerID = req.params.bloggerId;
        const articles = await Article.find({ blogger: new mongoose.Types.ObjectId(bloggerID) });
        const blogger = await Blogger.findById(bloggerID);
        articles.forEach(async (article) => {
            if (article.image !== 'article.png') {
                await fsPromises.unlink(path.join(__dirname, '../public/images/article', article.image));
            }
        });
        if (blogger.avatar !== 'blogger.png') {
            await fsPromises.unlink(path.join(__dirname, '../public/images/blogger', blogger.avatar));
        }
        await Comment.deleteMany({ blogger: bloggerID });
        await Article.deleteMany({ blogger: new mongoose.Types.ObjectId(bloggerID) });
        await Blogger.findByIdAndDelete(bloggerID);
        res.status(200).json({ result: true, message: 'Blogger was deleted successfully' });
    } catch (error) {
        next(error);
    }
}

const logout = (req, res) => {
    console.log('ok');
    req.session.destroy();
    res.clearCookie("blogger_seed");
    return res.status(200).redirect('/auth');
}

//delete blogger's article
const delete_article = async (req, res, next) => {
    try {
        const articleID = req.params.articleID;
        const article = await Article.findById(articleID);
        if (article.image !== 'article.png') {
            await fsPromises.unlink(path.join(__dirname, '../public/images/article', article.image));
        }
        await Comment.deleteMany({ article: articleID });
        await Article.findByIdAndDelete(articleID);
        return res.status(200).json({ result: true, message: 'article was deleted successfully.' });
    } catch (error) {
        next(error);
    }
}

//delete blogger's comment
const delete_comment = async (req, res, next) => {
    const commentID = req.params.commentID;
    try {
        await Comment.findByIdAndDelete(commentID);
        return res.status(200).json({ result: true, message: 'comment was deleted successfully.' });
    } catch (error) {
        next(error);
    }
}





module.exports = { profile_page, reset_password, delete_blogger, logout, delete_article, delete_comment };