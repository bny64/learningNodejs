const fs = require('fs');

fs.copyFile('isCreate.js', 'isCreate2.js', error=>{
    if(error){
        return console.error(error);
    }
    console.log('복사 완료');
})