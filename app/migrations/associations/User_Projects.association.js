module.exports = (sequelize) => {
  const { Users, Projects } = sequelize.models;

  Users.hasMany(Projects, {
    foreignKey: {
      name: "ownerUid",
      allowNull: true,
    },
    sourceKey: "uid",
    as: "projects",
  });

  Projects.belongsTo(Users, {
    foreignKey: {
      name: "ownerUid",
      allowNull: true,
    },
  });
};
