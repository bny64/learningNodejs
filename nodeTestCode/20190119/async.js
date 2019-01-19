const async = require("async");
const colors = require("colors");

const asyncFun = [];
asyncFun.push(function(callback){
    setTimeout(function(){
        console.log("first function");
        colors.rainbow("first function");
        let count = 10;
        callback(null, count);
    },3000)    
});

asyncFun.push(function(arg1, callback){
    setTimeout(() => {
        console.log("second function");
        colors.rainbow("second function");
        let count = 20;
        callback(null, arg1+count);
    }, 2000);    
})

async.waterfall(asyncFun, function(err, result){
    if(err) throw err;
    console.log(result);
    colors.red(result.toString());
});
