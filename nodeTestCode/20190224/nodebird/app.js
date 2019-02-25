const express = require('express'); //express module 추가
const cookieParser = require('cookie-parser'); //cookie parser module 추가
const morgan = require('morgan'); //morgan  module 추가
const path = require('path'); //path module
const session = require('express-session'); //session module
const flash = require('connect-flash'); //connect flash module
require('dotenv').config();

const pageRouter = require('./routes/page');
const {sequelize} = require('./models');

const app = express();
sequelize.sync();

app.set('views', path.join(__dirname, 'views')); //views 폴더를 연결
app.set('view engine', 'pug'); //view 엔진
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev')); //logger morgan 사용
app.use(express.static(path.join(__dirname, 'public'))); //public 폴더를 static으로 사용
app.use(express.json()); //bodyParser를 json형태로 변환
app.use(express.urlencoded({extended:false})); //url encode
app.use(cookieParser(process.env.COOKIE_SECRET)); //cookie 사용
app.use(session({
    resave : false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie : {
        httpOnly:true,
        secure:false,
    },
}));
app.use(flash()); //flash 사용

app.use('/', pageRouter);

app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 400;
    next(err);
})

app.use((err, req, res)=>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

app.listen(app.get('port'), () => {
    console.log(`App listening on port ${app.get('port')}!`);
});