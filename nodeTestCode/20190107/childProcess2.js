const spawn = require("child_process").spawn,
find = spawn("find", [".","-ls"]),
grep = spawn("grep", ["test"]);

grep.stdout.setEncoding("utf8");

find.stdout.on("data", data => {
    grep.stdin.write(data);
});

grep.stdout.on("data", data => {
    console.log(data);
});

find.stderr.on("data", data => {
    console.log("grep stderr: "+ data);   
})

grep.stderr.on("data", data => {
    console.log("grep stderr : " + data);
});

find.on("close", code => {
    if(code !== 0){
        console.log("find process exited with code "+code);
    }
    grep.stdin.end();
})

grep.on("exit", code => {
    if(code !== 0){
        console.log("grep process exited with code " + code);
    }
})