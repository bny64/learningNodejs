require('dotenv').config();
var express = require('express');
var router = express.Router();
var path = require('path');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
var debug = require('debug')('router');

/* GET home page. */
debug('#index# router is loaded');

router.get('/', function(req, res, next) {

  debug('#index# request(get) /'); 
  let renderData = {
    title : 'BNY'
  };

  /**
   * req.flash 한 번 읽으면 지워짐.
   */
  const flashMsg = req.flash('message');
  if(flashMsg[0]) renderData.message = flashMsg[0];
  if(req.user) renderData.user = req.user;
  res.render('index', renderData);
  
});

//로그인 페이지 이동
router.get('/login', isNotLoggedIn, (req, res)=>{

  debug('#index# request(get) /login');
  
  let renderData = {
    title : 'LOGIN',
    basedir : path.join(process.env.ROOT, 'views')
  }

  const flashMsg = req.flash('message');
  if(flashMsg[0]) renderData.message = flashMsg[0];
  res.render('auth/login', renderData);
  
});

module.exports = router; 
