const http = require('http');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(function(v){
            console.log(`first map`);
            console.log(v);
            return v.split('=')
        })
        .map(function([k, ... vs]){
            console.log(`second map`);
            console.log(`k : ${k}`);
            console.log(`vs : ${vs}, ${vs.join('=')}`);
            return [k, vs.join('=')];
        })
        .reduce((acc, [k, v])=>{
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer((req, res)=>{
    const cookies = parseCookies(req.headers.cookie);
    console.log(req.url, cookies);
    res.writeHead(200, {'Set-Cookie':'mycookie=test'});
    res.end('Hello Cookie');
})
.listen(8082, ()=>{
    console.log(`8082 포트 대기중`);
})