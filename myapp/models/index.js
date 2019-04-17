'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./users')(sequelize, Sequelize);
db.Board = require('./boards')(sequelize, Sequelize);
db.Comment = require('./comments')(sequelize, Sequelize);
db.UserFriend = require('./userFriends')(sequelize, Sequelize);

/**
 * 테이블의 관계는 각 해당 모델에서 정의하는 방법과 index.js에서 hasMany, hasOne등과 같은 메서드로 정의할 수 있다. 사용법은 sequelize 공식 문서 참고
 * 이 프로젝트는 모델에서 직접 정의함.
 * 모델에서 외래키를 정의하면 cascade 설정이 불가능한 것 같음. 그래서 index.js에서 메서드로 관계를 설정함.
 */

 /** 
  * hasMany ->
  *  foreignKey : 외래키가 될 타켓 테이블의 필드
  *  sourceKey : 외래키를 참조할 현재 테이블의 필드
  *  onDelete : delete 옵션 
 */
db.User.hasMany(db.UserFriend, {
    foreignKey : 'id',
    sourceKey : 'id',
    onDelete : 'cascade'
});

db.User.hasMany(db.Board, {
    foreignKey : 'id',
    sourceKey : 'id',
    onDelete : 'cascade'
});

db.User.hasMany(db.Comment, {
    foreignKey : 'id',
    sourceKey : 'id',
    onDelete : 'cascade'
})

db.Board.hasMany(db.Comment, {
    foreignKey : 'parListNo',
    sourceKey : 'listNo',
    onDelete : 'cascade'
});

module.exports = db;
