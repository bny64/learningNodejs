require('dotenv').config();
const express = require('express');
const router = express.Router();
const debug = require('debug')('router');
const {isLoggedIn} = require('../middlewares');

debug('#board# router is loaded');

router.get('/boardList', isLoggedIn, (req, res)=>{
    req.renderOption.title = 'BOARD LIST';
    res.render('board/boardList', req.renderOption);
});

router.get('/registBoard', isLoggedIn, (req, res)=>{
    req.renderOption.title = 'REGIST BOARD';
    res.render('board/registBoard', req.renderOption);
});

module.exports = router;