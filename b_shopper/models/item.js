module.exports = (sequelize, DataTypes) => (
    sequelize.define('item', {
        seq : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true,
            unique : true,
        },
        itemNm : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        itemPrice : {
            type : DataTypes.STRING(50),
            allowNull : false,
        },
        brandNm : {
            type : DataTypes.STRING(50),
            allowNull : true,
        },
        content : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        imgPath1 : {
            type : DataTypes.STRING(200),
            allowNull : true,
        },
        imgPath2 : {
            type : DataTypes.STRING(200),
            allowNull : true,
        },
        imgPath3 : {
            type : DataTypes.STRING(200),
            allowNull : true,
        },
        topCateSeq : {
            type : DataTypes.INTEGER,
            allowNull : true,            
        },
        midCateSeq : {
            type : DataTypes.INTEGER,
            allowNull : true,            
        },        
        regDate : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.fn('NOW'),
        }
    },{
        timestamps:false,
        tableName : 'item'
    })
);