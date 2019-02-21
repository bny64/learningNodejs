const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        if(process.env.NODE_ENV !== 'production'){
            mongoose.set('debug', true);
        }
    };
};