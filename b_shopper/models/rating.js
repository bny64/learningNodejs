module.exports = (sequelize, DataTypes) => (
    sequelize.define('rating', {
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
        address : {
            type : DataTypes.STRING(200),
            allowNull : false,
        },        
        score : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 1,
        },
        regDate : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.fn('NOW'),
        }
    },{
        timestamps:false,
        tableName : 'rating'
    })
);