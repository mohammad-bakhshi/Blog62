const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { loginChecker } = require('../middlewares/authorization');
const bloggerValidation = require('../middlewares/validation/bloggerValidation');
const bloggerController = require('../controllers/bloggerController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/blogger'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.PNG' && ext !== '.jpg' && ext !== '.JPG' && ext !== '.gif' && ext !== '.GIF' && ext !== '.jpeg' && ext !== '.JPEG') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
});

//check if blogger is not logged in can not access profile page
router.use(loginChecker);

//render profile page & delete blogger
router.route('/profile')
    .get(bloggerController.profile_page)
    .delete(bloggerController.deleteAccount)

//render update page & update blogger
router.route('/update')
    .get(bloggerController.update_page)
    .put(bloggerValidation.updateValidator, bloggerController.update_blogger)

//upload avatar
router.post('/avatar', upload.single('avatar'), bloggerController.uploadAvatar);

//logout 
router.get('/logout', bloggerController.logout);



module.exports = router;