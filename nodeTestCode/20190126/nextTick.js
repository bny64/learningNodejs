const colors = require("colors");
setImmediate(()=>{
    console.log(colors.rainbow('immediate'));
})

process.nextTick(()=>{
    console.log(colors.rainbow('nextTick'));
})

setTimeout(() => {
    console.log(colors.rainbow('timeout'));
}, 0);

Promise.resolve().then(()=>console.log(colors.zebra('promise')));