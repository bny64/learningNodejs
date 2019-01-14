const util = require("util");
const eventEmitter = require("events").eventEmitter;
const fs = require("fs");

exports.inputChecker = inputChecker;

function inputChecker(name, file){
    this.name = name;
    this.writeStream = fs.createWriteStream("./"+file+".txt", {
        "flags":"a",
        "encoding":"utf8",
        "mode":0666
    })
}

util.inherits(inputChecker, eventEmitter);
inputChecker.prototype.check = function(input){
    let self = this;
    let command = input.toString().trim().substr(0,3);
    if(command==="wr:"){
        self.emit("write",input.substr(3, input.length));
    }else if(command==="en:"){
        self.emit("end");
    }else{
        self.emit("echo", input);
    }
}