const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const { loginChecker } = require('../middlewares/authorization');
const articleValidation = require('../middlewares/validation/articleValidation');
const articleController = require('../controllers/articleController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/article'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    }
})

const upload = multer({
    storage: storage, fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.PNG' && ext !== '.jpg' && ext !== '.JPG' && ext !== '.gif' && ext !== '.GIF' && ext !== '.jpeg' && ext !== '.JPEG') {
            return callback(new TypeError('Only images are allowed'))
        }
        callback(null, true)
    }
});

//check if blogger is not logged in can not access profile page
router.use(loginChecker);

router.route('/')
    .get(articleController.article_page)
    .post(upload.single('image'), articleValidation.createValidator, articleController.create_article)

router.route('/:articleId')
    .get(articleController.update_page)
    .put(upload.single('image'), articleValidation.updateValidator, articleController.update_article)
    .delete(articleController.delete_article)



// router.post('/readmore/:articleId', articleController.add_comment);




module.exports = router;