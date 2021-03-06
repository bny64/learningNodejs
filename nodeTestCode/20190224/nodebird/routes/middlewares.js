//exports.isLoggedIn과 module.exports.isLoggedIn은 같다.
//두 가지 형태 모두 사용 가능.
//인증처리를 정의해놓고 router에서 middleware로 사용하면 됨.
exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(403).send('로그인 필요');
    }
}
//첫 로그인시 호출됨.
//로그인이 되어 있지 않기 때문에 next(); 실행
exports.isNotLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
}

