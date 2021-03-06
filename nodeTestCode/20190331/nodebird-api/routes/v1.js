const express = require('express');
const jwt = require('jsonwebtoken');
const debug = require('debug')('router');
const {verifyToken} = require('./middlewares');
const {Domain, User, Post, HashTag} = require('../models');

const router = express.Router();
debug('v1 router is loaded'); 

router.post('/token', async (req, res)=>{
    debug('body : ' + req.body);
    const {clientSecret} = req.body;
    try {

        let domain = null;

        if(clientSecret){
            domain = await Domain.findOne({
                where: {clientSecret},
                include:{
                    model : User,
                    attribute : ['nick', 'id'],
                },
            });
        }
        if(!domain){
            return res.status(401).json({
                code:401,
                message : '등록되지 않은 도메인 입니다. 먼저 도메인을 등록하세요.',
            });
        }

        const token = jwt.sign({
            id : domain.user.id,
            nick : domain.user.nick,
        }, process.env.JWT_SECRET, {
            expiresIn : '1m',
            issuer : 'nodebird',
        });
        return res.json({
            code : 200,
            message : '토큰이 발급되었습니다.',
            token,
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            code : 500,
            message : '서버 에러',
        });
    }
});

router.get('/test', verifyToken, (req, res)=>{
    res.json(req.decoded);
});

router.get('/posts/my', verifyToken, (req, res)=>{
    Post.findAll({where:{userId:req.decoded.id}})
    .then((posts)=>{
        console.log(posts);
        res.json({
            code:200,
            payload:posts,
        });
    })
    .catch((error)=>{
        console.error(error);
        return res.status(500).json({
            code:500,
            message:'서버 에러',
        });
    });
});

router.get('/posts/hastag/:title', verifyToken, (req,res)=>{
    try {
        const hashtag = await hashtag.findOne({where:{title:req.params.title}});
        if(!hashtag){
            return res.status(404).json({
                code:404,
                message:'검색 결과가 없습니다',
            });
        }

        const posts = await hashtag.getPosts();
        return res.json({
            code:200,
            payload:posts,
        });
    } catch (error){
        console.error(error);
        return res.status(500).json({
            code:500,
            message:'서버 에러', 
        })
    }
});

module.exports = router;