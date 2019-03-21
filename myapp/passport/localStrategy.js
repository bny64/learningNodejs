const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const debug = require('debug')('passport_localStrategy.js');

const {User} = require('../models');
module.exports = (passport) => {
    passport.use(new LocalStrategy({
        "usernameField" : 'email',
        "passwordField" : 'pass'
    }, async(email, pass, done)=>{
        debug(`email : ${email}, pass:${pass}`);
        try{
            const exUser = await User.findOne({where:{email}});
            if(exUser){
                const result = await bcrypt.compare(pass, exUser.userPass);
                if(result){
                    done(null, exUser);
                }else{
                    done(null, false, {message:'비밀번호가 일치하지 않습니다.'});
                }
            }else{
                done(null, false, {message:'가입되지 않은 회원입니다.'});
            }
        }catch(error){
            console.error(error);
        }
    }));
}