const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const debug = require('debug')('passport');
const loginLog = require('../logService/log');
const loginLogObj = new loginLog();

const {User} = require('../models');

debug("#passport# localStrategy is loaded");

module.exports = (passport) => {
    debug('before passport.use');
    passport.use(new LocalStrategy({
        "usernameField" : 'id',
        "passwordField" : 'password'
    }, async(id, password, done)=>{
        debug('in passport');
        debug(`${id}, ${password}`)
        try{
            const exUser = await User.findOne({where:{id}});
            debug(`${exUser}`);
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){                    
                    //loginLogObj.insertLog(exUser.id, exUser.userName);
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