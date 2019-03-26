const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const debug = require('debug')('router_page.js');
const router = express.Router();
const {Post, User} = require('../models')

//isLoggedIn, isNotLoggedIn middleware는 미리 정의해놓았기 때문에 url이 매핑될 때 단순히 넣어주기만 하면 됨. 사용하기 편리
router.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile', {title:'내 정보 - NodeBird', user:req.user});
});

router.get('/join', isNotLoggedIn, (req, res)=>{
    debug(' /join get');
    res.render('join', {
        title:'회원가입 - NodeBird',
        user:req.user,
        joinError:req.flash('joinError'),
    });
})

router.get('/', (req, res, next)=>{
    Post.findAll({
        include:{
            model:User,
            attributes:['id', nick],
        },
        order:[['createdAt', 'DESC']]
    })
    .then((posts)=>{
        res.render('main',{
            title : 'NodeBird',
            twits:posts,
            user:req.user,
            loginError:req.flash('loginError'),
        });
    })
    .catch((error)=>{
        console.error(error);
        next(error);
    });
})

module.exports = router;

