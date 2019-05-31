module.exports = (sequelize, DataTypes) => (
    sequelize.define('cart', {
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
        quantity : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },        
        regDate : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.fn('NOW'),
        }
    },{
        timestamps:false,
        tableName : 'cart'
    })
);