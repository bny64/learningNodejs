module.exports = (sequelize, DataTypes) => (
    sequelize.define('boards', {
        listNo : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true, 
        },
        id : {
            type : DataTypes.STRING(20),
            allowNull : false,            
        },        
        name : {
            type:DataTypes.STRING(30),
            allowNull:false,
        },
        contents : {
            type:DataTypes.TEXT,
            allowNull:true,
        },
        password : {
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        passYn : {
            type:DataTypes.STRING(1),
            allowNull:false,
            defaultValue:'N',
        },
        title : {
            type:DataTypes.STRING(100),
            allowNull:false,            
        }
    })
);