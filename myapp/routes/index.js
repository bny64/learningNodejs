var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.joinCheck){
    delete req.session.joinCheck;
    res.render('index', {title : 'BNY', joinCheck:true});
  }else{
    res.render('index', { title: 'BNY', joinCheck:false});
  }
});

router.get('/login', (req, res, next)=>{
  res.render('auth/login', {
    title : 'LOGIN'
  });
});

module.exports = router;
