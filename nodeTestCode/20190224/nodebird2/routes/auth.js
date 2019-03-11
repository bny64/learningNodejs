const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const { User } = require('../models');
const debug = require('debug')('auth.js');

const router = express.Router();
router.post('/join', async (req, res, next) => {
    debug(' /join post');
    const { email, nick, password } = req.body; //body에서 email, nick, password 가져옴
    try {
        const exUser = await User.find({where:{email}}); //user정보를 email로 가져옴.
        if(exUser){ //email로 검색한 유저가 있다면 중복 발생
            req.flash('joinError', '이미 가입된 이메일 입니다.');
            return res.redirect('/join');
        }

        const hash = await bcrypt.hash(password, 12); //패스워드 암호화
        await User.create({
            email,
            nick, //닉네임
            password : hash,
        }); //새로운 유저 생성
        return res.redirect('/');
    }catch(error){
        console.error(error);
        return next(error); //error 미들웨어로 넘겨줌
    }
})

router.post('/login', isNotLoggedIn, (req, res, next)=>{
    //첫 번째 파라미터가 local이기 때문에 local strategy로 이동.
    passport.authenticate('local', (authError, user, info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }

        if(!user){
            req.flash('loginError', info.message);
            return res.redirect('/');
        }

        return req.login(user, (loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        })
    })(req, res, next);
})

router.get('/logout', isLoggedIn, (req, res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
})

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect : '/',
}), (req, res)=>{
    res.redirect('/');
})

module.exports = router;