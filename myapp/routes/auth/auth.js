require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const crypto = require('crypto');
const debug = require('debug')('auth.js');
const path = require('path');

debug('router is loaded');
//회원가입 submit
router.post('/join', async (req, res)=>{
    debug('router.post /join');
    const {email, pass, name, age} = req.body;
    const userKey = crypto.createHash('sha256').update(email).digest("hex");
    try{
        const exUser = await User.findOne({where:{email:email}});
        if(exUser){
            req.flash('joinError', '이미 가입된 EMAIL 입니다.');
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

        req.flash('joinSuccess', '가입에 성공했습니다.');
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

    const flashMsg = req.flash('joinError');
    if(flashMsg[0]) renderData.message = flashMsg[0];

    res.render('auth/join',renderData);
    
});

module.exports = router;