require('dotenv').config();
const express = require('express');
const router = require('./routes');
const debug = require('debug');
//window : set DEBUG=*, linux : export DEBUG=*

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', router);
app.listen(process.env.PORT,()=>{
    debug('server running!');
    console.log('server running!');
});