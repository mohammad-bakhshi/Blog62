const express = require('express');
const router = express.Router();

const { sessionChecker } = require('../middlewares/authorization');
const bloggerValidation = require('../middlewares/validation/bloggerValidation');
const authController = require('../controllers/authController');

//check if blogger is logged in can not access login and sign up page
router.use(sessionChecker);

//render sign up & sign in pages
router.get('/', authController.auth_page);

//create blogger
router.post('/signup', bloggerValidation.createValidator, authController.create_blogger);

//login blogger
router.post('/signin', bloggerValidation.loginValidator, authController.login_blogger);

module.exports = router;
