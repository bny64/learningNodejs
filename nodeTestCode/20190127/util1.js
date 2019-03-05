const util = require('util');
const crypto = require('crypto');

const dontUseMe = util.deprecate((x,y)=>{
    console.log(x+y);
}, 'dontUseMe 함수는 사용하지 마세요');

dontUseMe(1,2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
.then((buf)=>{
    console.log(buf.toString('base64'));
})