var util = require("util");
var eventEmitter = require("events").EventEmitter;
var fs = require("fs");

function inputChecker(name, file){
    console.log(name);
    this.name = name;
    this.writeStream = fs.createWriteStream("./"+file+".txt", {
        "flags":"a",
        "encoding":"utf8",
        "mode":0666
    } )
};

util.inherits(inputChecker, eventEmitter);

inputChecker.prototype.check = function(input) {
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
화살표 함수는 this가 바인딩 되지 않음.
*/

let ic = new inputChecker("Shelley", "output");

ic.on("write", function(data){
    this.writeStream.write(data, "utf8");
})

ic.on("echo", function(data){
    console.log(this.name + " wrote " + data);
})

/* 여기에서 보시다시피 일반 선언식 함수를 사용하면 this는 자기 자신에 묶이는데 반해 
화살표 함수는 빈 객체로 나온다. */

ic.on("end", ()=>{
    process.exit();
})

process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", input => {
    ic.check(input);
})