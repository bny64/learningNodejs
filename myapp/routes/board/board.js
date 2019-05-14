require('dotenv').config();
const express = require('express');
const router = express.Router();
const debug = require('debug')('router');
const url = require('url');
const {isLoggedIn} = require('../middlewares');
const {Board, Comment, Sequelize} = require('../../models');
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
            attributes:['listNo', 'name', 'title','contents'],
            offset:pageSize * (pageNo - 1),
            limit:pageSize,
            order : [['listNo','DESC']]
        });
        res.send({result:true, contents:contents});

    }catch(error){
        console.error(error);
    }
        
});

router.get('/viewBoard'/* , isLoggedIn */, async(req, res)=>{

    req.renderOption = {
        user : req.user,
        basedir:path.join(process.env.ROOT, 'views')
    };
    
    try{
        const listNo = url.parse(req.url, true).query.listNo;
        const content = await Board.findOne({
            attributes:['listNo','id','name','title','contents'],
            where:{listNo},
        });

        const comments = await Comment.findAll({
            attributes:['id','name','contents'],
            where : {
                parListNo : content.listNo
            }
        });
        //페이지 개발 완료했으면 삭제
        req.renderOption.content = content;
        req.renderOption.comments = comments;        
        req.renderOption.title = 'VIEW BOARD';
        res.render('board/viewBoard', req.renderOption);

    }catch(error){
        console.error(error);
    }
});

router.post('/getCommentList', async (req, res)=>{
    
    try{
        const pageNo = req.body.pageNo;        
        const pageSize = req.body.pageSize;
        const boardNo = req.body.boardNo;

        const countResult = await Comment.findAll({
            attributes : [[Sequelize.fn('COUNT', Sequelize.col('listNo')), 'count']],
            where : {
                parListNo : boardNo
            }
        });

        const contents = await Comment.findAll({
            attributes:['id', 'name', 'contents', 'listNo'],
            offset:pageSize * (pageNo - 1),
            limit:pageSize,
            order : [['listNo','DESC']],
            where : {
                parListNo : boardNo
            }
        });

        //res.send에서 프로퍼티가 undefined이면 view단에서는 나오지 않음.
        res.send({
            result:true, 
            contents,
            count : countResult,
        });

    }catch(error){
        console.error(error);
    }        
});

module.exports = router;