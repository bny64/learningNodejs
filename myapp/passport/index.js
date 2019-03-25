const {User} = require('../models');
const local = require('./localStrategy');
const debug = require('debug')('passport_index.js');

module.exports = (passport) => {
    passport.serializeUser((user, done)=>{
        debug(user.email);
        done(null, user.email);
    });

    passport.deserializeUser((email, done)=>{
        debug(`email : ${email}`);
        User.findOne({where:{email}})
        .then(user=>done(false, user))
        .catch(err=>done(err));
    });

    local(passport);
}