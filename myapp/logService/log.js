const mysql = require('mysql2');
const config = require('../config/config.json');
const debug = require('debug')('log.js');
const connection = mysql.createConnection({
    host : config.development.host,
    user :config.development.username,
    password : config.development.password,
    database : config.development.database,
});

module.exports = class mysqlConnect{
    constructor(){}
    insertLog(email, userName){
        connection.connect();    
        const queryString = `INSERT INTO loginLog(email, userName, usedType) VALUES (?, ?, ?)`;
        const params = [email, userName, 'nodejs'];
        connection.query(queryString, params, (err, rows, fields)=>{
            if(!err){
                debug(rows);                      
            }else{
                console.error(err);
                debug('error!!!!!!!!!');
            }
                
        });
        connection.end();
    }
}
/* 
module.exports = (email, userName)=>{    
    connection.connect();    
    const queryString = `INSERT INTO loginLog(email, userName, usedType) VALUES (?, ?, ?)`;
    const params = [email, userName, 'nodejs'];
    connection.query(queryString, params, (err, rows, fields)=>{
        if(!err){
            debug(rows);                      
        }else{
            console.error(err);
            debug('error!!!!!!!!!');
        }
            
    });

    connection.end();
}; */
