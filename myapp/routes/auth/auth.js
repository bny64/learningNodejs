require('dotenv').config();
const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const crypto = require('crypto');
const debug = require('debug')('router_auth.js');
const path = require('path');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');


debug('router is loaded');

//로그인
router.post('/login', async(req, res, next)=>{
    passport.authenticate('local', (authError, user, info)=>{
        debug('after local strategy');
        if(authError){
            console.error(authError);
            return next(authError);
        }

        if(!user){
            req.flash('message', info.message);
            return res.redirect('/login');
        }

        return req.login(user, (loginError)=>{
            debug('after req.login()');
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            
            req.flash('message', '로그인되었습니다.');
            return res.redirect('/');
        });
    })(req, res, next);
});

router.post('/logout', (req, res, next)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

//회원가입
router.post('/join', isNotLoggedIn, async (req, res)=>{
    debug('router.post /join');
    const {email, pass, name, age} = req.body;
    const userKey = crypto.createHash('sha256').update(email).digest("hex");        

    try{
        const exUser = await User.findOne({where:{email:email}});

        if(exUser){
            req.flash('message', '이미 가입된 이메일 입니다.');            
            return res.redirect('/auth/join');    
        }
        const hash = await bcrypt.hash(pass, 12);
        await User.create({
            email : email,
            userPass : hash,
            userName : name,
            age : age,
            userKey,
        });
        
        req.flash('message', '가입에 성공했습니다.');
        return res.redirect('/');

    }catch(error){
        console.error(error);        
    }
});

//회원가입 페이지 이동.
router.get('/join', (req, res)=>{
    debug('router.get /join');
    let renderData = {
        title : 'JOIN',
        basedir : path.join(process.env.ROOT, 'views')
    };

    const flashMsg = req.flash('message');
    if(flashMsg[0]) renderData.message = flashMsg[0];

    res.render('auth/join',renderData);
    
});

module.exports = router;