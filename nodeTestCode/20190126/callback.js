function one(callback1, callback2){
    name = "남열";
    setTimeout(() => {
        callback1(name, callback2);
    }, 1000);

}

function two(name, callback){
    name += ", 유우카";
    setTimeout(() => {
        callback(name);
    }, 1000);

}

function three(name){
    name += ", 원준";
    setTimeout(() => {
        console.log(name);    
    }, 1000);

}

one(two, three);