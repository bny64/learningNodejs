const express = require('express');
const uuidv4 = require('uuid');
const {User, Domain} = require('../models');
const debug = require('debug')('index.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
    debug(`req.user : ${req.user}`);
    
    let user = null;
    try {
        if(req.user){
            user = await User.findOne({where :{id:req.user && req.user.id}, include:{model:Domain},});  
        }

        res.render('login', {
            user,
            loginError : req.flash('loginError'),
            domains : user && user.domains,
        });
    }catch(error){
        console.log(error);
        next(error);
    }
});

router.post('/domain', (req, res, next)=>{
    Domain.create({
        userId : req.user.id,
        host : req.body.host,
        type : req.body.type,
        clientSecret:uuidv4(),
    })
    .then(()=>{
        res.redirect('/');
    })
    .catch((error)=>{
        next(error);
    });
});

module.exports = router;