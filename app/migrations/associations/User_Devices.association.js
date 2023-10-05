module.exports = (sequelize) => {
  const { Users, Devices } = sequelize.models;

  Users.hasMany(Devices, {
    foreignKey: {
      name: "userUid",
      allowNull: true,
    },
    sourceKey: "uid",
    as: "devices",
  });

  Devices.belongsTo(Users, {
    foreignKey: {
      name: "userUid",
      allowNull: true,
    },
  });
};
