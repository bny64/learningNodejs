const crypto = require('crypto');

module.exports = class security{
    compareStringHash(str, hash){        
        const str_hash = crypto.createHash('sha256').update(str).digest('hex');        
        if(hash===str_hash){
            return true;
        }else{
            return false; 
        }
    }
}