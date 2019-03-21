var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');

const {sequelize} = require('./models');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth/auth');
var usersRouter = require('./routes/users');
var passport = require('passport');
var passportConfig = require('./passport');

var app = express();
sequelize.sync();
passportConfig(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('scripts', path.join(__dirname, 'scripts'));
app.set('view engine', 'pug');

//app.use(logger('dev'));
app.use(logger('combined', { //400이하일 때 skip
  skip:function(req, res){
    return res.statusCode < 400;
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  path:'/',
  httpOnly:true,
  resave: false,
  saveUninitialized: true,
  secret:'!@BNY!@'
}));
app.use(flash());
//순서중요 static 경로 설정후 passport 사용
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
