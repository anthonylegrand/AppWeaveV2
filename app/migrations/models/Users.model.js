const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Users",
    {
      uid: {
        type: DataTypes.STRING(128),
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      anonymous: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      freezeTableName: true,
    }
  );
};
