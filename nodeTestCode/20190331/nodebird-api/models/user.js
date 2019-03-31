//sequelize -> config.json에서 변수로 만든 sequelize 객체, DataTypes -> require('sequelize') 로 만든 sequelize객체 자체
module.exports = (sequelize, DataTypes) => (//DataTypes : sequelize가 가지고 있는 프로퍼티.
  //sequelize.define('이름', {정의할 테이블 데이터 타입})
    sequelize.define('user', {
      email: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    }, {
      timestamps: true,
      paranoid: true,
    })
  );