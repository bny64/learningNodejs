const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const {User} = require('../models');
const debug = require('debug')('passport_index.js');

//passport 파라미터는 passport 모듈
//app.js의 passportConfig에 passport.serializeUser, deserializeUser 정의.
//로그인시와 로그인 후 페이지 이동할 때의 미들웨어 정의.
module.exports = (passport) => {    
    //로그인 성공시 request.session.passport.user에 저장함.
    passport.serializeUser((user, done) =>{
        debug('passport.serializeUuser');
        done(null, user.id);
        debug('send userInfo to deserializeuser?');
    });

    //서버에 들어오는 요청마다 세션 정보를 실제 db와 비교하고 해당하는 유저정보가 있으면 두 번째 파라미터에 user를 저장하고 넘겨줌.
    passport.deserializeUser((id, done) => {
        debug('passport.deserializeUser');
        User.find({where:{id},
            include:[{
                model:User,
                attributes:['id','nick'],
                as:'Followers',
            },{
                model : User,
                attributes:['id','nick'],
                as:'Followings',
            }],
        })
            .then(user=> done(null, user))
            .catch(err => done(err));
    })

    //이 메서드들을 passport에 넣어주고 local, kakao에 넘겨줌.
    //passport.seiralizeUser, passport.deserializeUser을 localStrategy에 정의.
    //즉 로컬에서 가입하고 로컬계정을 이런 방식으로 처리해 주겠다는 것.
    local(passport);
    kakao(passport);
}