module.exports = (sequelize, DataTypes) => (
    sequelize.define('topCategory', {
        seq : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true,
            unique : true,
        },       
        categoryNm : {
            type : DataTypes.STRING(50),
            allowNull : false,
            unique : true,
        }
    },{
        timestamps:false,
        tableName : 'topCategory'
    })
);