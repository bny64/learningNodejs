const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') => 
cookie
    .split(';')
    .map(function(v){
        console.log(`v : ${v}`);
        console.log(`v.split : ${v.split('=')}`);
        return v.split('=');
    })
    .map(([k, ...vs])=>{
        console.log(` k : ${k}`);
        console.log(`vs : ${vs}`);
        console.log(`vs.join : ${vs.join('=')}`);
        return [k, vs.join('=')]
    })
    .reduce((acc, [k, v])=>{
        console.log(acc);
        console.log(` [k, v] : ${k}, ${v}`);
        acc[k.trim()] = decodeURIComponent(v);
        console.log(`acc[k.trim()] : ${acc[k.trim()]}`);
        return acc;
    }, {});

const session = {};

http.createServer((req, res)=>{
    const cookies = parseCookies(req.headers.cookie);
    if(req.url.startsWith('/login')){
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        const randomInt = +new Date();
        session[randomInt] = {
            name,
            expires
        };
        res.writeHead(302, {
            Location : '/',
            'Set-Cookie':`session=${randomInt}; Expires=${expires.toUTCString()}; HttpOnly; Path='/', `
        });
        res.end();

    } else if(cookies.session && session[cookies.session].expires > new Date()){
        res.writeHead(200, {'Content-Type':'text/html; chartset=utf-8'});
        console.log(`name : ${session[cookies.session].name}`);
        res.end(`${session[cookies.session].name}님 안녕하세요`);
    }else{
        fs.readFile('./server4.html', (err, data)=>{
            if(err) throw err;
            res.end(data);
        });
    }
}).listen(8084, ()=>{
    console.log('8084 대기중');
})