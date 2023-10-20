const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Users_Projects",
    {
      UserUid: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      ProjectUuid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      permission: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
          max: 10,
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
