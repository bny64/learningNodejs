const a = function(callback){
    let name = "john";
    callback(name);
}

const b = function(param1){
    console.log(param1);
}

const c = function(){
    console.log("smith");
}

a(b);
c();

(function(){
    a(b);
    c();
})();