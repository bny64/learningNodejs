const colors = require("colors");


const obj = function(){};

obj.prototype.doSomething = function(arg1, arg2_){
    let arg2 = typeof(arg2_) === "string" ?  arg2_ : null;

    var callback_ = arguments[arguments.length - 1];
    callback = (typeof(callback_)) === "function" ? callback_ : null;

    if(!arg2){
        return callback(new Error("second argument missing or not a string"));
    }

    callback(arg1);
}

let test = new obj();

try{
    test.doSomething("test",3.55, function(err, value){
        if(err) throw err;

        console.log(value.rainbow);
    })
}catch(err){
    console.log(err.rainbow);
}