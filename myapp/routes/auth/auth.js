require('dotenv').config();
const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const crypto = require('crypto');
const debug = require('debug')('router');
const path = require('path');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');

debug('#auth# router is loaded');

//로그인
router.post('/login', isNotLoggedIn, async(req, res, next)=>{
    debug('#auth# request(post) /auth/login');
    passport.authenticate('local', (authError, user, info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            req.flash('message', info.message);
            return res.redirect('/login');
        }

        return req.login(user, (loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            
            req.flash('message', '로그인되었습니다.');            
            return res.redirect('/');
        });
    })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next)=>{
    debug('#auth# request(post) /auth/logout')
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

//회원가입
router.post('/join', async (req, res)=>{
    debug('#auth# request(post) /auth/join');
    const {id, pass, email, name, phoneNumber, birthday, emailYn, introduction} = req.body;
    const userKey = crypto.createHash('sha256').update(id).digest("hex");    

    try{
        const exUser = await User.findOne({where:{id:id}});

        if(exUser){
            req.flash('message', '이미 가입된 이메일 입니다.');            
            return res.redirect('/auth/join');    
        }
        const hash = await bcrypt.hash(pass, 12);
        await User.create({
            userKey,
            id,
            email,
            password:hash,
            userName:name,
            usedType : 'nodejs',
            phoneNumber,
            emailYn,
            birth:birthday,
            intMySelf : introduction
        });        

        req.flash('message', '가입에 성공했습니다. 로그인을 해주세요.');
        return res.redirect('/');

    }catch(error){
        console.error(error);        
    }
});

//회원가입 페이지 이동.
router.get('/join', isNotLoggedIn, (req, res)=>{
    debug('#auth# request(get) /auth/join');
    let renderData = {
        title : 'JOIN',
        basedir : path.join(process.env.ROOT, 'views')
    };

    const flashMsg = req.flash('message');
    if(flashMsg[0]) renderData.message = flashMsg[0];

    res.render('auth/join',renderData);
    
});

module.exports = router;