module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        index : {
            type : DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        email : {
            type : DataTypes.STRING(30),
            allowNull : false,
        },        
        userPass : {
            type:DataTypes.STRING(200),
            allowNull:false,
        },
        userName : {
            type:DataTypes.STRING(30),
            allowNull:false,
        },        
        age : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        userKey : {
            type : DataTypes.STRING(200),
            allowNull : false,            
        },
        usedType : {
            type : DataTypes.STRING(15),
            alloNull : false,
        }
    })
);