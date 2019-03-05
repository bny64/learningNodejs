const inputChecker = require("inputcheck").inputChecker;
const colors = require("colors");

let rainbow = colors.rainbow;

const ic = new inputChecker("Shelley", "output");

ic.on("write", function(data){
    this.writeStream.write(data, "utf8");
})

ic.addListener("echo", function(data){
    rainbow(this.name + " wrote" + data);
})

ic.on("end", ()=>{
    process.exit();
})

process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", input => {
    ic.check(input);
})