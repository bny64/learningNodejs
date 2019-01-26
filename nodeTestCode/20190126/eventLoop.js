const colors = require("colors");

console.log("hello");
setTimeout(function(){
    console.log("hello".rainbow)
    setTimeout(function(){
        setTimeout(() => {
            console.log("hello2".zebra);
        }, 1000);
    },1000)
},1000);