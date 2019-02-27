//DB 관계 정의하는 /models/index.js
const Sequelize = require('sequelize'); //모듈을 불러온다.
const env = process.env.NODE_ENV || 'development'; //환경변수에서 찾음.
const config = require('../config/config')[env]; //'config.json의 development 프로퍼티를 사용'
const db = {};

//정의한 databasem username, password로 sequelize 생성
//app.js에서 사용할 모듈
const sequelize = new Sequelize( 
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize; //app.js의 const{sequelize}가 가리키는 프로퍼티
db.Sequelize = Sequelize; //sequelize모듈 자체
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
//세 프로퍼티 모두 같은 방식으로 생성. 자세한 내용은 ./user에 작성

//관계 정의
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); //두 테이블의 join를 위해 PostHashtag 새로운 모델 생성.
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
db.User.belongsToMany(db.User, {
  foreignKey: 'followingId',
  as: 'Followers',
  through: 'Follow',
});
db.User.belongsToMany(db.User, {
  foreignKey: 'followerId',
  as: 'Followings',
  through: 'Follow',
});

module.exports = db;