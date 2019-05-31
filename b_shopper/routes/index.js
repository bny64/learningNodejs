var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('main/index', { 
    basedir : path.join(process.env.ROOT, 'views'),
    title: 'Express' 
  });
});

module.exports = router;
