const readline = require("readline");

const interface = readline.createInterface(process.stdin, process.stdout, null);

interface.question(">> What is the meaning of life? ", answer=>{
    console.log("About the meaning of life, you said " + answer);
    interface.setPrompt(">>");
    interface.prompt();

    const closeInterface = () => {
        console.log("Leaving interface...");
        process.exit();
    }

    interface.on("line", cmd => {
        if(cmd.trim() == ".leave"){
            closeInterface();
            return;
        }else{
            console.log("repeating command : "+ cmd);
        }

        interface.setPrompt(">>");
        interface.prompt();
    });

    interface.on("close", ()=>{
        closeInterface();
    });
});