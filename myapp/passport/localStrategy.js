const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const debug = require('debug')('passport');
const loginLog = require('../logService/log');
const loginLogObj = new loginLog();

const {User} = require('../models');

debug("#passport# localStrategy is loaded");

module.exports = (passport) => {
    /**
     * passport에서 usernameField, passwordField로 사용하는 것은 req.body에 담겨있는 값. 
     * default 값은 username, password 인데 값이 다를 경우 new LocalStrategy 첫번째 매개변수로 사용할 필드값을 설정해야 함.
     * 필드값은 태그의 name 값
     */
    passport.use(new LocalStrategy({
        usernameField : 'id',
        passwordField : 'password'
    }, async(id, password, done)=>{        
        try{
            const exUser = await User.findOne({where:{id}});            
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    loginLogObj.insertLog(exUser.id, exUser.userName);
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