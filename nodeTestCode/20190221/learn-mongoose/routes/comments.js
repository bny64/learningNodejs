var express = require('express');
var Comment = require('../schemas/comment');

var router = express.Router();

/* GET users listing. */
router.get('/:id', async function(req, res, next) {
  try{
    const comments = await Comment.find({commenter:req.params.id}).populate('commenter');
    console.log(comments);
    res.json(comments);
  }catch(err){
      console.error(err);
      next(err);
  }
});

router.post('/', async function(req, res, next){
  const comment = new Comment({
      commenter:req.body.id,
      comment:req.body.comment
  });

  comment.save()
  .then((result)=>{
      return Comment.populate(result, {path:'commenter'});
  })
  .then((result)=>{
      res.status(201).json(result);
  })
  .catch((err)=>{
      console.error(err);
      next(err);
  })
})

router.patch('/:id', async function(req, res, next){
    try{
        const result = await Comment.update({_id:req.params.id}, {comment:req.body.comment});
        res.json(result);
    }catch(err){
        console.error(err);
        next(err);
    }
})

router.delete('/:id', async function(req, res, next){
    try {
        const result = await Comment.remove({_id:req.params.id});
        res.json(result);
    }catch(err){
        console.error(err);
        next(err);
    }
})

module.exports = router;
