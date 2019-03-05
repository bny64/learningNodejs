const crypto = require('crypto');
const buffer_ = Buffer.from(crypto.randomBytes(6));

console.log(buffer_); //<Buffer bc 9e ae f7 29 44>
console.log(new Buffer("안녕")); //<Buffer ec 95 88 eb 85 95>