const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

const { loginChecker, isAdmin } = require('../middlewares/authorization');

//check if blogger is not logged in can not access profile page
router.use(loginChecker);
//check if blogger role is not admin and can not access admin profile page
router.use(isAdmin);

//get admin profile page
router.get('/profile', adminController.profile_page);
//logout admin
router.get('/logout', adminController.logout);
//reset password
router.get('/profile/:bloggerId', adminController.reset_password);

router.delete('/profile/:bloggerId', adminController.delete_blogger);

//delete blogger's article
router.delete('/article/:bloggerID/:articleID', adminController.delete_article);





module.exports = router;