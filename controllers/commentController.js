const Comment = require('../models/comment');

//add comment
const add_comment = async (req, res, next) => {
    try {
        if (!req.body.text) {
            return res.status(400).json({ result: false, message: 'Text is required.' });
        }
        else if (req.body.text.length < 10) {
            return res.status(400).json({ result: false, message: 'Comment length must be at least 10.' });
        }
        else {
            const data = {
                text: req.body.text,
                blogger: req.session.blogger._id,
                article: req.params.articleId
            };
            await Comment.create(data);
            return res.status(200).redirect(`/home/${req.params.articleId}`);
        }
    } catch (error) {
        next(error);
    }
}



module.exports = { add_comment };