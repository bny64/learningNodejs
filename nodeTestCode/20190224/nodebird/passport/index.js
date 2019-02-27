const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const {User} = require('../models');

//passport 파라미터는 passport 모듈
module.exports = (passport) => {
    //로그인 성공시 request.session.passport.user에 저장함.
    passport.serializeUser((user, done) =>{
        done(null, user.id);
    });

    //서버에 들어오는 요청마다 세션 정보를 실제 db와 비교하고 해당하는 유저정보가 있으면 두 번째 파라미터에 user를 저장하고 넘겨줌.
    passport.deserializeUser((id, done) => {
        User.find({where:{id}})
            .then(user=> done(null, user))
            .catch(err => done(err));
    })

    //이 메서드들을 passport에 넣어주고 local, kakao에 넘겨줌.
    local(passport);
    kakao(passport);
}