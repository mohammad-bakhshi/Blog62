const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const path = require('path');
const fsPromises = require('fs/promises');

const Blogger = require("../models/blogger");
const Article = require('../models/article');
const Comment = require('../models/comment');

const profile_page = async (req, res, next) => {
    try {
        if (req.session.blogger.role === 'Admin') {
            return res.redirect('/admin/profile');
        }
        else {
            const blogger = await Blogger.findById(req.session.blogger._id);
            const articles = await Article.find({ blogger: req.session.blogger._id }).sort([['updatedAt', -1], ['createdAt', -1]]);
            return res.status(200).render("bloggerProfile", { title: "Profile", blogger: blogger, articles: articles });
        }
    } catch (error) {
        return next(error)
    }
}

//update page
const update_page = async (req, res, next) => {
    try {
        const blogger = await Blogger.findById(req.session.blogger._id, { firstname: 1, lastname: 1, username: 1, cellphone: 1, _id: 0 });
        return res.status(200).render('updateBlogger', { title: 'Update Page', blogger: blogger });
    } catch (error) {
        next(error);
    }
}

const update_blogger = async (req, res, next) => {
    try {
        await Blogger.findByIdAndUpdate(req.session.blogger._id, req.body);
        return res.status(200).json({ result: true, message: "Blogger was updated successfully." });
    } catch (error) {
        return next(error);
    }
}

const uploadAvatar = async (req, res, next) => {
    try {
        let updates = {
            avatar: req.file.filename
        };
        const blogger = await Blogger.findById(req.session.blogger._id);
        if (blogger.avatar !== 'blogger.png') {
            await fsPromises.unlink(path.join(__dirname, '../public/images/blogger', blogger.avatar));
        }
        await Blogger.findByIdAndUpdate(req.session.blogger._id, updates);
        return res.status(200).redirect('/blogger/profile');
    } catch (error) {
        return next(error)
    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.clearCookie("blogger_seed");
    return res.status(200).redirect('/auth');
}

const deleteAccount = async (req, res, next) => {
    try {
        const articles = await Article.find({ blogger: req.session.blogger._id });
        const blogger = await Blogger.findById(req.session.blogger._id);
        articles.forEach(async (article) => {
            if (article.image !== 'article.png') {
                await fsPromises.unlink(path.join(__dirname, '../public/images/article', article.image));
            }
        });
        if (blogger.avatar !== 'blogger.png') {
            await fsPromises.unlink(path.join(__dirname, '../public/images/blogger', blogger.avatar));
        }
        await Comment.deleteMany({ blogger: req.session.blogger._id });
        await Article.deleteMany({ blogger: req.session.blogger._id });
        await Blogger.findByIdAndDelete(req.session.blogger._id);
        req.session.destroy();
        res.clearCookie("blogger_seed");
        return res.status(200).json({ result: true, message: 'Blogger was deleted successfully' });
    } catch (error) {
        return next(error);
    }
}



module.exports = { profile_page, uploadAvatar, update_page, update_blogger, logout, deleteAccount }