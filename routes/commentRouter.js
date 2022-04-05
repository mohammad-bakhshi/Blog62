const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const { loginChecker } = require('../middlewares/authorization');

router.use(loginChecker);

router.post('/:articleId', commentController.add_comment);

module.exports = router;