require('dotenv').config();
var express = require('express');
var router = express.Router();
var path = require('path');
var debug = require('debug')('index.js');

/* GET home page. */
debug('router is loaded');

router.get('/', function(req, res, next) {

  debug('router.get /'); 
  let renderData = {
    title : 'BNY'
  };

  const flashMsg = req.flash('message');
  if(flashMsg[0]) renderData.message = flashMsg[0];
  if(req.user) renderData.user = req.user;
  res.render('index', renderData);
  
});

//로그인 페이지 이동
router.get('/login', (req, res)=>{

  debug('router.get /login');

  res.render('auth/login', {
    title : 'LOGIN',
    basedir : path.join(process.env.ROOT, 'views')
  });
  
});

module.exports = router; 
