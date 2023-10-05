const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ApiConnect",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ProjectUuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      source: {
        type: DataTypes.ENUM,
        values: ["REST_API"], // Python, Java, NodeJS, ...
        allowNull: false,
        defaultValue: "REST_API"
      },
      ipAddress: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: [DataTypes.INET],
            msg: "Invalid IP address",
          },
        },
      },
      at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
    },
    {
      timestamps: true,
      updatedAt: false,
      freezeTableName: true,
    }
  );
};