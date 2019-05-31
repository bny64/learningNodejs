module.exports = (sequelize, DataTypes) => (
    sequelize.define('checkout', {
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
        orderStatus : {
            type : DataTypes.STRING(1),
            allowNull : false,
            defaultValue : 'A',
        },
        transStatus : {
            type : DataTypes.STRING(1),
            allowNull : false,
            defaultValue : 'R',
        },
        exchangeStatus : {
            type : DataTypes.STRING(1),
            allowNull : false,
            defaultValue : 'N',
        },
        regDate : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.fn('NOW'),
        }
    },{
        timestamps:false,
        tableName : 'checkout'
    })
);