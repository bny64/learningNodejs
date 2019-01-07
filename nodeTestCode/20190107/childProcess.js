const spawn = require("child_process").spawn,
pwd = spawn("pwd");

pwd.stdout.on("data", data => {
    console.log("stdout : " + data);
});

pwd.stderr.on("data", data => {
    console.log("stderr : " + data);
});

pwd.on("exit", code => {
    console.log("child process exited with code " + code);
});