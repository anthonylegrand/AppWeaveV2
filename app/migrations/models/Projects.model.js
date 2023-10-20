const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Projects",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ownerUid: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      publicKey: {
        type: DataTypes.STRING(6),
        allowNull: false,
        unique: true,
      },
      privateKey: {
        type: DataTypes.STRING(22),
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
};
