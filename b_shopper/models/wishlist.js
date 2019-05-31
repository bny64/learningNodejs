module.exports = (sequelize, DataTypes) => (
    sequelize.define('wishlist', {
        seq : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true,
            unique : true,
        },  
        userSeq : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        itemSeq : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },        
    },{
        timestamps:false,
        tableName : 'wishlist'
    })
);