const fs = require("fs");
try {
    fs.readFile("./apples2.txt", "utf8", (err, data)=>{
        console.log(data)
        if(err) throw err;
        console.log(data)
        let adJData = data.replace(/[A|a]pple/g, "orange");

        fs.writeFile("./oranges.txt", adJData, err=>{
            if(err) throw err
        })
        console.log(data)
    })
}catch(err){
    console.log(err);
}