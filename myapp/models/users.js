module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        userId :{
            type:DataTypes.STRING(30),
            allowNull: false,
        },
        userPass : {
            type:DataTypes.STRING(200),
            allowNull:false,
        },
        email : {
            type : DataTypes.STRING(30),
            allowNull : false,
        },
        userKey : {
            type : DataTypes.STRING(100),
            allowNull : false,            
        }
    })
);