const fs = require("fs"),
    Step = require("step");
let files;
const _dir = "./data/";

try{
    Step(
        function readDir(){
            fs.readdir(_dir, this); //err, result
        },
        function readFile(err, results){
            if(err) throw err;
            files = results;
            let group = this.group();
            results.forEach(name=>{
                fs.readFile(_dir+name, "utf8", group());
            })
        },
        function writeAll(err, data){
            if(err) throw err;
            for(let i=0; i<files.length; i++){
                let adjdata = data[i].replace(/somecompany\.com/g, "burningbird.net");
                fs.writeFile(_dir + files[i], adjdata, "utf8", this);
            }
        }
    )
}catch(err){
    console.error(err);
}