const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookie = (cookie = '') =>
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
        console.log(`acc : ${acc}`);
        console.log(` [k, v] : ${k}, ${v}`);
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {});

    http.createServer((req, res)=>{
        const cookies = parseCookie(req.headers.cookie);
        if(req.url.startsWith('/login')){
            const {query} = url.parse(req.url);
            const {name} = qs.parse(query);
            const expires = new Date();
            expires.setMinutes(expires.getMinutes()+5);
            res.writeHead(302, {
                Location:'/',
                'Set-Cookie':`name=${encodeURIComponent(name)};
                Expires=${expires.toUTCString()}; HttpOnly; Path=/`,
            });
            res.end();
        }else if(cookies.name){
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            res.end(`${cookies.name}님 안녕하세요`);
        }else{
            fs.readFile('./server4.html', (err, data)=>{
                if(err){
                    throw err;
                }
                res.end(data);
            });
        }
    }).listen(8083, ()=>{
        console.log(`8083포트 대기중`);
    })