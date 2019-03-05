const fs = require("fs");
const async = require("async");

try {
    async.waterfall([
        function readData(callback){
            fs.readFile("./data/data1.txt", "utf8", (err, data)=>{
                callback(err, data)
            })
        },
        function modify(text, callback){
            let adjdata = text.replace(/somecompany\.com/g, "burningbird.net");
            callback(null, adjdata)
        },
        function writeData(text, callback){
            fs.writeFile("./data/data2.txt", text, err=>{
                callback(err, text)
            })
        }
    ], (err, result)=>{
        if(err) throw err;
        console.log(result);
    })
}catch(err){
    console.log(err);
}