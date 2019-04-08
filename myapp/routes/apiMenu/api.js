require('dotenv').config();
const express = require('express');
const router = express.Router();
const debug = require('debug')('router_api.js');
const path = require('path');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');

debug('router is loaded');
router.get('/highcharts', isLoggedIn, (req, res)=>{
    debug(req.user);

    res.render('apiMenu/highcharts', {
        title : 'HIGHCHARTS',
        user : req.user,
        basedir:path.join(process.env.ROOT, 'views')
    });
});

module.exports = router;