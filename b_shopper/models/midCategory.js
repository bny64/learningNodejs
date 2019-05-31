module.exports = (sequelize, DataTypes) => (
    sequelize.define('midCategory', {
        seq : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true,
            unique : true,
        },
        parCateSeq : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        categoryNm : {
            type : DataTypes.STRING(50),
            allowNull : false,
        }
    },{
        timestamps:false,
        tableName : 'midCategory'
    })
);