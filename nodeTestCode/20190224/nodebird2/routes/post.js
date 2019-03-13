const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const debug = require('debug')('post.js');

const {Post, Hashtag, User} = require('../models');
const {isLoggedIn} = require('./middlewares');

const router = express.Router();

fs.readdir('uploads', error=>{
    if(error){
        console.error(`uploads 폴더가 없어 uploads 폴더를 생성합니다.`);
        fs.mkdirSync('uploads');
    }
})

const upload = multer({
    storage : multer.diskStorage({ //파일 저장방식, 경로, 파일명 설정
        destination(req, res, cb){ //저장경로
            cb(null, 'uploads/');
        },
        filename(req, res, cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);//파일 이름
        },
    }),
    limits:{fileSize:5*1024*1024},
});
router.post('/img', isLoggedIn, upload.single('img'), (req,res)=>{
    debug(`${req.file}`);
    res.json({url:`/img/${req.file.filename}`});
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next)=>{
    try {
        const post = await Post.create({
            content : req.body.content,
            img : req.body.url,
            userId : req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s]*/g);
        if(hashtags){
            const result = await Promise.all(hashtags.map(tag=>
                Hashtag.findOrCreate({
                    where : { title : tag.slice(1).toLowerCase() },
                })
            ));
            await post.addHashtags(result.map(r=> r[0]));
        }
        res.redirect('/');
    }catch(error){
        console.error(error);
        next(error);
    }
});
module.exports = router;