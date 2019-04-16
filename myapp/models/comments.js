module.exports = (sequelize, DataTypes) => (
    sequelize.define('comments', {
        listNo : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true, 
        },
        id : {
            type : DataTypes.STRING(20),
            allowNull : false,
            references : {
                model : models.users,
                key : 'id',
            }
        },        
        contents : {
            type:DataTypes.TEXT,
            allowNull:false,
        },
        secretYn : {
            type:DataTypes.STRING(1),
            allowNull:false,
            defaultValue : 'N',
        },
        parListNo : {
            type:DataTypes.INTEGER,
            allowNull:false,            
        },        
    })
);