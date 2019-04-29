const mysql = require('mysql2');
const config = require('../config/config.json');
const debug = require('debug')('log');
const connection = mysql.createConnection({
    host : config.development.host,
    user :config.development.username,
    password : config.development.password,
    database : config.development.database,
});

module.exports = class mysqlConnect{
    constructor(){}
    insertLog(id, userName){
        connection.connect();
        const queryString = `INSERT INTO loginLog(id, userName, usedType) VALUES (?, ?, ?)`;
        const params = [id, userName, 'nodejs'];
        connection.query(queryString, params, (err, rows, fields)=>{
            if(!err){
                debug('Log is written');
            }else{
                console.error(err);
                debug('error!!!!!!!!!');
            }
                
        });
        /**
         * connection.query 후 connection.end() 함수 호출시
         * Can't add new command when connection is in closed state 에러 발생
         * connection.query 실행후 자동으로 커넥션 닫는듯.
         */
        //connection.end();
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
