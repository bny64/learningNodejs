const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');
const debug = require('debug')('passport_localStrategy.js');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField:'password',
        //옵션 객체 뒤 함수는 옵션에서 정의한 프로퍼티
        // usernameField : 'email' -> email
        // passwordField:'passoword' -> password
    }, async (email, password, done)=>{
        try {
            //db에서 email로 유저를 찾음.
            const exUser = await User.find({where:{email}});
            debug('local Strategy');
            if(exUser){
                //비밀번호 비교.
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    //결과가 맞으면 user 리턴
                    done(null, exUser);
                }else{
                    //비밀번호가 틀리면 flash message 리턴
                    done(null, false, {message:'비밀번호가 일치하지 않습니다.'});
                }
            }else{
                //해당 email이 없으면 flash message 리턴
                done(null, false, {message:'가입되지 않은 회원입니다.'});
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }))
}