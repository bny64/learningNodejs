const {User} = require('../models');
const local = require('./localStrategy');
const debug = require('debug')('passport_index.js');

module.exports = (passport) => {
    //유저정보를 쿠키에 등록
    passport.serializeUser((user, done)=>{
        done(null, user.email);
    });
    //쿠키에서 유저정보 가져옴.
    passport.deserializeUser((email, done)=>{
        User.findOne({where:{email}})
        .then(user=>done(null, user))
        .catch(err=>done(err));
    });

    local(passport);
}