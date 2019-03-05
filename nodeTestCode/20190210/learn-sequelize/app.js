var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comments');
var sequelize = require('./models').sequelize; //db.sequelize

var app = express();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //app path 설정
app.set('view engine', 'pug');

app.use(logger('dev')); //개발환경 logger 셋팅
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); //index 라우터 추가
app.use('/users', usersRouter); //users 라우터 추가
app.use('/comments', commentsRouter); //comments 라우터 추가


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
