var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.joinCheck){
    delete req.session.joinCheck;
    res.render('index', {title : 'BNY', joinCheck:true});
  }else{
    res.render('index', { title: 'BNY' });
  }
});

module.exports = router;
