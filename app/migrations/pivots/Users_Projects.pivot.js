module.exports = (sequelize) => {
  const { Users, Projects, Users_Projects } = sequelize.models;

  Users.belongsToMany(Projects, {
    through: Users_Projects,
  });

  Projects.belongsToMany(Users, {
    through: Users_Projects,
  });
};
