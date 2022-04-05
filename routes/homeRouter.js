const express = require('express');
const router = express.Router();

const Article = require('../models/article');
const homeController = require('../controllers/homeController');
// const { paginatedResults } = require('../middlewares/pagination');

//render home page
router.get('/', homeController.home_page);

router.get('/:articleId', homeController.read_more);

module.exports = router;