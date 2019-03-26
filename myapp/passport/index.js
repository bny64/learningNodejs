const {User} = require('../models');
const local = require('./localStrategy');
const debug = require('debug')('passport_index.js');

module.exports = (passport) => {
    passport.serializeUser((user, done)=>{
        done(null, user.email);
    });

    passport.deserializeUser((email, done)=>{
        User.findOne({where:{email}})
        .then(user=>done(false, user))
        .catch(err=>done(err));
    });

    local(passport);
}