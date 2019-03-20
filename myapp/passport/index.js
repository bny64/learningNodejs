const {User} = require('../models');
const local = require('./localStrategy');

module.exports = (passport) => {
    passport.serializeUser((user, done)=>{
        done(null, user.email);
    });

    passport.deserializeUser((email, done)=>{
        User.findOne({where:{email}})
        .then(user=>done(null, user))
        .catch(err=>done(err));
    });

    local(passport);
}