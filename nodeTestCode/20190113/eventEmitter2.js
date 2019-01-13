var util = require("util");
var eventEmitter = require("events").EventEmitter;
var fs = require("fs");

function inputChecker(name, file){
    inputChecker.super_.call(eventEmitter);
    this.name = name;
    this.writeStream = fs.createWriteStream("./"+file+".txt", {
        "flags":"a",
        "encoding":"utf8",
        "mode":0666
    } )
};

util.inherits(inputChecker, eventEmitter);

inputChecker.prototype.check = input => {
    var command = input.toString().trim().substr(0,3);
    if(command === "wr:"){
        this.emit("write", input.substr(3, input.length));
    }else if(command === "en:"){
        this.emit("end");
    }else{
        this.emit("echo", input);
    }
}
/*
화살표 함수의 this는 자신의 바로 바깥 쪽의 this를 가리킴.
그래서 inputChecker.prototype.check를 선언식으로 정의하면 this는 inputChecker를 가리키지만
화살표 함수로 정의하는 경우 this는 전역의 this를 가리킴.
실제로 값을 확인해보면 {} 빈 객체가 떨어짐.

*/

let ic = new inputChecker("Shelley", "output");

ic.on("write", data=>{
    this.writeStream.write(data, "utf8");
})

ic.on("echo", data=>{
    console.log(this.name + "wrote " + data);
})

ic.on("end", ()=>{
    process.exit();
})

process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", input => {
    ic.check.bind(inputChecker);
    ic.check(input);
})