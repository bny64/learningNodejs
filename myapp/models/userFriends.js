module.exports = (sequelize, DataTypes) => (
    sequelize.define('userFriends', {
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
        friendId : {
            type:DataTypes.STRING(20),
            allowNull:false,
        },
        status : {
            type:DataTypes.STRING(3),
            allowNull:false,
        },       
    },{
        timestamps: false,                  
    })
);