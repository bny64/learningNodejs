const fs = require("fs"),
    Step = require("step");
    debugger;
    try{
        Step(
            function readData(){
                fs.readFile("./data/data1.txt", "utf8", this);
                console.log(this);
            },
            function modify(err, text){
                if(err) throw err;
                return text.replace(/somecompany\.com/g,"burningbird.net");
            },
            function writeData(err, text){
                if(err) throw err;
                fs.writeFile("./data/data1.txt", text, this);
            }
        );
    }catch(err){
        console.err(err.stack);
    }