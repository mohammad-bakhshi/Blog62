const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const Blogger = require("./models/blogger");
const authRouter = require('./routes/authRouter');
const homeRouter = require('./routes/homeRouter');
const bloggerRouter = require('./routes/bloggerRouter');
const adminRouter = require('./routes/adminRouter');
const articleRouter = require('./routes/articleRouter');
const commentRouter = require('./routes/commentRouter');

//connect to DB
(async () => {
  try {
    const mongoURI = 'mongodb://localhost:27017/Blog62';
    await mongoose.connect(mongoURI);
    console.log("Database Connection Established...!");
  } catch (error) {
    //handle error(task)
    console.log("Error: Database connection can not be established...!\n", error.message);
    process.exit(1);
  }
})();

//create admin
(async () => {
  try {
    const admin = {
      firstname: 'admin',
      lastname: 'admin',
      username: 'admin',
      role: 'Admin'
    };
    const temp = await Blogger.findOne({ role: 'Admin' });
    if (!temp) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash('adminStrator', salt);
      await Blogger.create(admin);
    }
  } catch (error) {
    //handle error(task)
    console.log(error);
  }
})();

const app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "12345",
  key: "blogger_seed",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 10 * 60 * 1000 // min * second * millisecond
  }
}))

app.use((req, res, next) => {
  if (req.cookies.userSeed && !req.session.user) {
    res.clearCookie('blogger_seed');
  }
  next();
});

//use home router
app.use('/home', homeRouter);
//use auth router
app.use('/auth', authRouter);
//use blogger router
app.use('/blogger', bloggerRouter);
//use article router
app.use('/article', articleRouter);
//use admin router
app.use('/admin', adminRouter);
//use comment router
app.use('/comment', commentRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//error handler
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.status === 404) {
    return res.status(404).render('404', { title: 'Not Found' });
  }
  else if (err.name === 'SyntaxError') {
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;


// res.status(err.status || 500);
// console.log(err.code,err.name,err.message);
// if (err.name === 'ValidationError') {
//   console.log(err.errors);
//   return res.status(400).send(err.message);
// }
// if (err.status) {
//   console.log(err.status);
// }
// render the error page


//entries
//mongoose error,
