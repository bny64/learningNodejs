var express = require('express');
var User = require('../schemas/user');

var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.post('/', async function(req, res, next){
  try{
    const user = new User({
      name : req.body.name,
      age : req.body.age,
      married:req.body.married
    });
    
    var result = await user.save();
    console.log(result);
    res.status(201).json(result);
  }catch(err){
    console.error(err);
    next(err);
  }
  
})

module.exports = router;
