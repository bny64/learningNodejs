const fs = require("fs"),
    async = require("async");
let _dir = "./data/";

const writeStream = fs.createWriteStream("./log.txt", {
    "flags":"a",
    "encoding":"utf8",
    "mode":0666
});

try {
    async.waterfall([
        function readDir(callback){
            fs.readdir(_dir, function(err, files){
                callback(err, files);
            })
        },
        function loopFiles(files, callback){
            files.forEach(function(name){
                callback(null, name);
            })
           /*  const nameArr = [];
            files.forEach(async function(name){
                await nameArr.push(name);
            });
            callback(null, nameArr); */
        },
        function checkFile(file, callback){
            fs.stat(_dir+file, function(err, stats){
                callback(err, stats, file);
            })
        },
        function readData(stats, file, callback){
            if(stats.isFile()){
                fs.readFile(_dir+file, "utf8", function(err, data){
                    callback(err, file, data);
                })
            }
        },
        function modify(file, text, callback){
            let adjdata = text.replace(/somecompany\.com/g, "burningbird.net");
            callback(null, file, adjdata);
        },
        function writeData(file, text, callback){
            fs.writeFile(_dir+file, text , function(err){
                callback(err, file);
            })
        },
        function logChange(file, callback){
            writeStream.write("changed "+file+"\n", "utf8", function(err){
                callback(err, file);
            })
        }
    ], function(err, result){
        if(err) throw err;
        console.log("modifed " + result);
    })
}catch(err){
    console.log(err);
}
 