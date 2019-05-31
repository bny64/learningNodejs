module.exports = (sequelize, DataTypes) => (
    sequelize.define('loginLog', {
        seq : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true,
        },
        id : {
            type : DataTypes.STRING(30),
            allowNull : false,
        },
        name : {
            type : DataTypes.STRING(30),
            allowNull : false,
        },
        loginType : {
            type : DataTypes.STRING(20),
            allowNull : false,
        },                
        regDate : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.fn('NOW'),
        }
    },{
        timestamps:false,
        tableName : 'loginLog'
    })
);