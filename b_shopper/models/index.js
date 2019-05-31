'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Cart = require('./cart')(sequelize, Sequelize);
db.Checkout = require('./checkout')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Item = require('./item')(sequelize, Sequelize);
db.MidCategory = require('./midCategory')(sequelize, Sequelize);
db.TopCategory = require('./topCategory')(sequelize, Sequelize);
db.Rating = require('./rating')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Wishlist = require('./wishlist')(sequelize, Sequelize);
db.loginLog = require('./loginLog')(sequelize, Sequelize);

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

/**
 * db.User.hasMany -> undefined 에러 발생 시 모델 정의할 때 함수로 정의했는지 알아볼 것
 * module.exports = (sequelize, DataTypes) => { : error 발생
 * module.exports = (sequelize, DataTypes) => ( : 이렇게 시작해야 함.
 */

db.User.hasMany(db.Wishlist, {
    foreignKey : 'userSeq',
    sourceKey : 'seq',
    onDelete : 'cascade'
});

db.Item.hasMany(db.Wishlist, {
    foreignKey : 'itemSeq',
    sourceKey : 'seq',
    onDelete : 'cascade'
});

db.User.hasMany(db.Cart, {
    foreignKey : 'userSeq',
    sourceKey : 'seq',
    onDelete : 'cascade'
});

db.Item.hasMany(db.Cart, {
    foreignKey : 'itemSeq',
    sourceKey : 'seq',
    onDelete : 'cascade'
});

db.User.hasMany(db.Comment, {
    foreignKey : 'userSeq',
    sourceKey : 'seq',
    onDelete : 'cascade'
});

db.Item.hasMany(db.Comment, {
    foreignKey : 'itemSeq',
    sourceKey : 'seq',
    onDelete : 'cascade'
});

db.User.hasMany(db.Checkout, {
    foreignKey : 'userSeq',
    sourceKey : 'seq',
    onDelete : 'cascade'
});

db.Item.hasMany(db.Checkout, {
    foreignKey : 'itemSeq',
    sourceKey : 'seq',
    onDelete : 'cascade'
});

db.User.hasMany(db.Rating, {
    foreignKey : 'userSeq',
    sourceKey : 'seq',
    onDelete : 'cascade'
});

db.Item.hasMany(db.Rating, {
    foreignKey : 'itemSeq',
    sourceKey : 'seq',
    onDelete : 'cascade'
});

db.TopCategory.hasMany(db.Item, {
    foreignKey : 'topCateSeq',
    sourceKey : 'seq',
    onDelete : 'set null'
});

db.TopCategory.hasMany(db.MidCategory, {
    foreignKey : 'parCateSeq',
    sourceKey : 'seq',
    onDelete : 'cascade'
});

db.MidCategory.hasMany(db.Item, {
    foreignKey : 'midCateSeq',
    sourceKey : 'seq',
    onDelete : 'set null'
});

module.exports = db;
