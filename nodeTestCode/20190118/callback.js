const fs = require("fs");

try {
    let data = fs.readFileSync("./apples.txt", "utf8");
    console.log(data);
    let adjData = data.replace(/[A|a]pple/g, "orange");

    fs.writeFileSync("./oranges.txt", adjData);
}catch(err){
    console.log(err);
}