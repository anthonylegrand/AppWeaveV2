const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Devices",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userUid: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      os: {
        type: DataTypes.ENUM,
        values: ['WEB', 'ANDROID', 'IOS'],
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      pushNotificationToken: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};