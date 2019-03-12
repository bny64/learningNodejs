require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const crypto = require('crypto');
const debug = require('debug')('auth.js');
const path = require('path');

//회원가입 submit
router.post('/join', async (req, res)=>{
    const {account, password, emailAcc, emailAdd} = req.body;
    const userKey = crypto.createHash('sha256').update(account).digest("hex");
    try{

        debug(`info : ${account}, ${password}, ${emailAcc + emailAdd}, ${userKey}`);
        const exUser = await User.find({where:{userId:account}});
        if(exUser){
            req.flash('joinError', '이미 가입된 ID입니다.');
            return res.redirect('/');
        }
        debug(`password : ${password}`);
        const hash = await bcrypt.hash(password, 12);
        debug(`hash : ${hash}`);
        await User.create({
            userId : account,
            userPass : hash,
            email : emailAcc + emailAdd,
            userKey,
        });
        req.session.joinCheck = true;
        return res.redirect('/');

    }catch(error){
        console.error(error);        
    }
});

//회원가입 페이지 이동.
router.get('/join', (req, res)=>{
    debug('/join get');
    res.render('auth/join',{
        title : 'JOIN',
        basedir : path.join(process.env.ROOT, 'views')
    });
    
});

module.exports = router;