require('dotenv').config();
const debug = require('debug')('router_middleware.js');
const path = require('path');

const middleware = {
    isLoggedIn(req, res, next){
        //req.isAuthenticated -> req.login() 자동호출.
        if(req.isAuthenticated()){
            
            req.renderOption = {
                user : req.user,
                basedir:path.join(process.env.ROOT, 'views')
            };
            
            next();
        }else{
            //res.status(403).send('로그인 필요');
            res.redirect('/login');
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