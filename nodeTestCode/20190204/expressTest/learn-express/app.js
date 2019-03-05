var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var pug = require('pug');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev')); //로그 남기는 기능
app.use(express.static(path.join(__dirname, 'public'))); //경로 관리
app.use(express.json()); //body-parser기능
app.use(express.urlencoded({ extended: false })); //req.body가 json형태로 들어옴
app.use(cookieParser('secret code')); //쿠키 관리
app.use(session({
  resave : false, //요청이 왔을 때 세션에 수정 사항이 생기지 않더라도 다시 저장 여부
  saveUninitialized : false, //저장할 내역이 없더라도 세션을 저장할지 여부. 방문자 추적
  secret:'secret code',
  cookie:{
    httpOnly:true,
    secure:false
  }
}));
app.use(flash());
app.use('/', indexRouter);
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
