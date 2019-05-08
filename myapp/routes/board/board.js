require('dotenv').config();
const express = require('express');
const router = express.Router();
const debug = require('debug')('router');
const {isLoggedIn} = require('../middlewares');
const {Board} = require('../../models');

const path = require('path');

debug('#board# router is loaded');

router.get('/boardList', isLoggedIn, (req, res)=>{

    const flashMsg = req.flash('message');
    if(flashMsg[0]) req.renderOption.message = flashMsg[0];
    req.renderOption.title = 'BOARD LIST';
    res.render('board/boardList', req.renderOption);
});

router.get('/registBoard',isLoggedIn , (req, res)=>{
    req.renderOption = {        
        basedir:path.join(process.env.ROOT, 'views')
    };
    req.renderOption.title = 'REGIST BOARD';
    res.render('board/registBoard', req.renderOption);
});

router.post('/registBoard', isLoggedIn, (req, res)=>{    
    const {password, contents, title} = req.body;   
    try{
        const boardObj = {
            id:req.user.id,
            name:req.user.name,
            title,
            contents,            
        }        
        if(password){
            boardObj.password = password;
            boardObj.passYn = 'Y';
        }
        Board.create(boardObj);        
        req.flash('message', '등록되었습니다.');
        return res.redirect('/board/boardList');

    }catch(error){
        console.error(error);
    }
});

router.post('/getBoardList', async (req, res)=>{

    try{
        const pageNo = req.body.pageNo;
        const pageSize = req.body.pageSize;
        const contents = await Board.findAll({
            attributes:['name', 'title','contents'],
            offset:pageNo, 
            limit:pageSize
        });
        res.send({result:true, contents:contents});

    }catch(error){
        console.error(error);
    }
        
});

module.exports = router;