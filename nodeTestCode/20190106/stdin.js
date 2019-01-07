process.stdin.resume();
process.stdin.on('data', (chunk)=>{
    process.stdout.write(`data : ${chunk}`);
    console.log(process.memoryUsage());
});