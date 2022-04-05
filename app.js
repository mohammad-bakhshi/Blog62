const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
let RedisStore = require('connect-redis')(session);
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
    const mongoDB_URL = 'mongodb://root:dQRMQPyl9kTfMsjlXPbZE2ke@tommy.iran.liara.ir:33495/my-app?authSource=admin&replicaSet=rs0';
    await mongoose.connect(process.env.DATABASE_URL || mongoDB_URL, {
      authSource: 'admin'
    });
  } catch (error) {
    //handle error(task)
    console.log("Error: Database connection can not be established...!\n", error.message);
    process.exit(1);
  }
})();

mongoose.connection.on('open', function () {
  console.log("Database Connection Established...!");
});

let redisClient;
//connect to redis
(async () => {
  try {
    redisClient = redis.createClient({ legacyMode: true });
    await redisClient.connect(process.env.SESSIONDB_URL);
    console.log("Redis Connection Established...!");
  } catch (error) {
    console.log("Error: Redis connection can not be established...!\n", error.message);
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
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: "12345",
    key: "blogger_seed",
    resave: false,
    cookie: {
      maxAge: 10 * 60 * 1000 // min * second * millisecond
    }
  })
)

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
//entries
//mongoose error,
