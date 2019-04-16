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

db.User.hasMany(db.UserFriend);
db.User.hasMany(db.Board);
db.user.hasMany(db.Comment);

db.UserFriend.belongsToMany(db.User, {
    foreignKey : 'id',
    targetKey : 'id',
})

db.Board.hasMany(db.Comment);
db.Board.belongsToMany(db.User, {
    foreignKey : 'id',
    targetKey : 'id',
});

db.Comment.belongsToMany(db.Board, {
    foreignKey : 'parListNo',
    targetKey : 'listNo',
});
db.Comment.belongsToMany(db.User, {
    foreignKey : 'id',
    targetKey : 'id',
});

module.exports = db;
