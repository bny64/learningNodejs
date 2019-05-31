module.exports = (sequelize, DataTypes) => (
    sequelize.define('comment', {
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
        title : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },        
        content : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        regDate : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.fn('NOW'),
        }
    },{
        timestamps:false,
        tableName : 'comment'
    })
);