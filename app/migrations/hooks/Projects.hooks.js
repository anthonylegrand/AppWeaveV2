const randomstring = require("randomstring");

module.exports = (sequelize) => {
  const { Projects } = sequelize.models;

  Projects.beforeValidate(async (projects, options) => {
    if (options?.type === "BULKUPDATE") return;
    projects.publicKey = randomstring.generate(6);
    projects.privateKey = randomstring.generate(22);
  });

  Projects.addHook("beforeFind", (options) => {
    if (!options.attributes) options.attributes = {};
    else if (Array.isArray(options.attributes))
      options.attributes = {
        include: options.attributes,
      };

    options.attributes.exclude = ["createdAt", "privateKey"];
  });
};
