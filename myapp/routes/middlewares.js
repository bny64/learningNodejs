const debug = require('debug')('router_middleware.js');

const middleware = {
    isLoggedIn(req, res, next){
        //req.isAuthenticated -> req.login() 자동호출.
        if(req.isAuthenticated()){
            next();
        }else{
            res.status(403).send('로그인 필요');
        }
    },
    isNotLoggedIn(req, res, next){
        debug('isNotLoggedIn');
        if(!req.isAuthenticated()){
            next();
        }else{
            res.redirect('/');
        }
    }
}

module.exports = middleware;