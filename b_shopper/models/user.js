module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        seq : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true,
            unique : true,
        },
        userKey : {
            type : DataTypes.STRING(300),
            allowNull : false
        },
        id : {
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
        password : {
            type : DataTypes.STRING(200),
            allowNull : false,
        },
        name : {
            type : DataTypes.STRING(30),
            allowNull : false,
        },
        email : {
            type : DataTypes.STRING(50),
            allowNull : false,
            unique : true,
        },
        address : {
            type : DataTypes.TEXT,
            allowNull : true,
        },
        userType : {
            type : DataTypes.STRING(1),
            allowNull : false,
            defaultValue : 'G',
        },
        userClass : {
            type : DataTypes.STRING(1),
            allowNull : false,
            defaultValue : 'B',
        },
        joinType : {
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        regDate : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : DataTypes.fn('NOW'),
        }
    },{
        timestamps : false,
        tableName : 'user'
    })
);
/*        
        //timestamps: false,

        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        paranoid: true,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'my_very_custom_table_name'
*/