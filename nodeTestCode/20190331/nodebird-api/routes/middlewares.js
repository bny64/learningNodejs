const jwt = require('jsonwebtoken');
const debug = require('debug')('middlewares.js');
//exports.isLoggedIn과 module.exports.isLoggedIn은 같다.
//두 가지 형태 모두 사용 가능.
//인증처리를 정의해놓고 router에서 middleware로 사용하면 됨.
exports.isLoggedIn = (req, res, next) => {
    debug('isLoggedIn');
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(403).send('로그인 필요');
    }
}

exports.isNotLoggedIn = (req, res, next)=>{
    debug('isNotLoggedIn');
    if(!req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
}

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    }catch(error){
        if(error.name === 'TokenExpiredError'){
            return res.status(419).json({
                code : 419,
                message : '토큰이 만료되었습니다'
            });
        }
        return res.status(401).json({
            code:401,
            message : '유효하지 않은 토큰입니다.',
        })
    }
};