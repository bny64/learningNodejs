process.on('uncaughtException', err=>{
    console.error('예기치 못한 에러',err);
})

setInterval(() => {
    throw new Error('서버 파괴');
}, 1000);

setTimeout(() => {
    console.log('실행됩니다.');
}, 2000);