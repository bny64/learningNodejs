const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

readFilePromise('./readme.txt').then((data)=>{
    console.log(data);
    console.log(data.toString());
}).catch((err)=>{
    throw err;
});