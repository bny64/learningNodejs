module.exports = (sequelize, DataTypes) => (
    sequelize.define('users', {
        userKey : {
            type : DataTypes.STRING(200),
            allowNull : false,          
        },
        id : {
            type : DataTypes.STRING(20),
            allowNull : false,
            primaryKey : true,
        },        
        email : {
            type:DataTypes.STRING(30),
            allowNull:false,
        },
        password : {
            type:DataTypes.STRING(200),
            allowNull:false,
        },        
        userName : {
            type : DataTypes.STRING(30),
            allowNull : false,
        },
        createdAt : {
            type : DataTypes.DATE,
            allowNull : true,            
        },
        joinedType : {
            type : DataTypes.STRING(15),
            allowNull : false,
        },
        phoneNumber : {
            type : DataTypes.STRING(30),
            allowNull : true,
        },
        profilePath : {
            type : DataTypes.STRING(100),
            allowNull : true,
        },
        emailYn : {
            type : DataTypes.STRING(1),
            allowNull : false,
            defaultValue : 'N',
        },
        birth : {
            type : DataTypes.DATEONLY,
            allowNull : true,
        },
        intMySelf : {
            type : DataTypes.TEXT,
            allowNull : true,
        }
    },{
        timestamps: false,                  
    })
);