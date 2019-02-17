var express = require('express');
var {User, Comment} = require('../models');
var colors = require('colors');

var router = express.Router();
router.get('/:id', async function(req, res, next){
    console.log('get : '.rainbow);
    try{
        const result = await Comment.findAll({
            include : {
                model:User,
                where : {id:req.params.id},
            }
        });

        console.log(result);
        res.json(result);

    }catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/', async function(req, res, next){
    try{
        const result = await Comment.create({
            commenter:req.body.id,
            comment:req.body.comment,
        });

        console.log('post : '+result);
        res.status(201).json(result);
    }catch(error){
        console.error(err);
        next(err);
    }
});

router.patch('/:id', async function(req, res, next){
    try{
        const result = await Comment.update({
            comment : req.body.comment,
        },{
            where: {id:req.params.id}
        });

        res.json(result);
        
    }catch(error){
        console.log(error);
        next(err);
    };
});

router.delete('/:id', async function(req, res, next){
    try{
        const result = await Comment.destroy({where:{id:req.params.id}});
        res.json(result);
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;