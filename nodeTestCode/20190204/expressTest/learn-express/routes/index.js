var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.locals.title = 'Express';
  res.render('index');
  /**
   * res.send(버퍼 또는 문자열 또는 HTML 또는 JSON);
   * res.sendFile(파일 경로);
   * res.json(JSON 데이터);
   * res.redirect(주소);
   * res.render('템플릿 파일 경로', {변수});
   */
});

/* router.get('/test',(req,res,next)=>{
  res.render('test', {title:'Express'});
}) */

module.exports = router;
