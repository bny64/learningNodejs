const crypto = require('crypto');
const argo = 'aes-128-gcm';
const iv = Buffer.from(crypto.randomBytes(16)); //iv형성
const key = Buffer.from(crypto.randomBytes(16)); //key값 형성

const cipher = crypto.createCipheriv(argo, key, iv);
let result = cipher.update('security sentence','utf8', 'base64'); 
console.log(result);
result += cipher.final('base64');
console.log('암호화:', result);

const decipher = crypto.createDecipheriv(argo, key, iv);
let result2 = decipher.update(result, 'base64', 'utf8');
//result += decipher.final();
console.log('복호화:', result2);