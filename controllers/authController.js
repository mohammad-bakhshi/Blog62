const bcrypt = require('bcryptjs');
const Blogger = require("../models/blogger");

//render sign up and sign in pages
const auth_page = (req, res) => {
    return res.status(200).render('auth', { title: 'Sign up | Sign in page' });
}

//create a new blogger
const create_blogger = async (req, res, next) => {
    try {
        const blogger = await Blogger.findOne({ username: req.body.username }, { username: 1, _id: 0 });
        if (!blogger) {
            const data = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                cellphone: req.body.cellphone,
                gender: req.body.gender,
                username: req.body.username
            };
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(req.body.password, salt);
            await Blogger.create(data);
            return res.status(200).json({ result: true, message: "Blogger was created successfully." });
        } else {
            return res.status(422).json({ result: false, message: "Username already exists." });
        }
    } catch (error) {
        return next(error)
    }
}

//login as a blogger
const login_blogger = async (req, res, next) => {
    try {
        const blogger = await Blogger.findOne({ username: req.body.username });
        if (!blogger) {
            return res.status(422).json({ result: false, message: "Blogger not found" });
        }
        else {
            const validPassword = await bcrypt.compare(req.body.password, blogger.password);
            if (validPassword) {
                req.session.blogger = blogger;
                return res.status(200).json({ result: true, message: "You are logged in." });
            }
            else {
                return res.status(422).json({ result: false, message: "Password was not correct." });
            }
        }
    } catch (error) {
        return next(error)
    }
}

module.exports = { auth_page, create_blogger, login_blogger };