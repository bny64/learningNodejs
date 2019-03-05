//콜백함수 promisify 시키기

const util = require('util');

const callbackFunc = (param1, param2, callback)=>{
    let result = param1 * param2 + 3000  * 90000;
    callback(null, result);
}

const makePromise = util.promisify(callbackFunc);

makePromise(3,4).then((result)=>{
    console.log(result+'!');
}).catch((err)=>{
    console.error(err);
})
