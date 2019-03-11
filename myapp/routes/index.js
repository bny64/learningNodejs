require('dotenv').config();
var express = require('express');
var router = express.Router();
var path = require('path');
var debug = require('debug')('index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.joinCheck){
    delete req.session.joinCheck;
    res.render('index', {title : 'BNY', joinCheck:true});
  }else{
    res.render('index', { title: 'BNY', joinCheck:false});
  }
});

router.get('/login', (req, res)=>{
  debug('/login router');
  res.render('auth/login', {
    title : 'LOGIN',
    basedir : path.join(process.env.ROOT, 'views')
  });
});

module.exports = router;
