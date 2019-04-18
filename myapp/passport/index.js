const {User} = require('../models');
const local = require('./localStrategy');
const debug = require('debug')('passport');

debug("#passport# index is loaded");

module.exports = (passport) => {
    //유저정보를 쿠키에 등록
    passport.serializeUser((user, done)=>{
        /**
          * localStrategy에서 request에 유저정보를 저장. 
          * user는 req.user에 들어있는 user정보         
         */
        done(null, user.id);
    });
    //쿠키에서 유저정보 가져옴.
    passport.deserializeUser((id, done)=>{
        User.findOne({where:{id}})
        .then(user=>done(null, user))
        .catch(err=>done(err));
    });

    local(passport);
}