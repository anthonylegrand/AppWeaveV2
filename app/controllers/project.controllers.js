const randomstring = require("randomstring");

const { Projects } = global.sequelize.models;

module.exports.create = async (req, res) => {
  try {
    const project = await Projects.create({
      ...req.body,
      ownerUid: req.user.uid,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.update = async (req, res) => {
  const { displayName } = req.body;
  try {
    if (!(await hasPerms(req.user.uid, req.params.uuid)))
      return res.status(401).send({
        success: false,
        error: "Token missing. Authentication required.",
      });

    const [rowCount] = await Projects.update(
      {
        displayName,
      },
      {
        where: {
          uuid: req.params.uuid,
          ownerUid: req.user.uid,
        },
        limit: 1,
      }
    );

    if (rowCount === 1) res.status(200).json({ sucess: true });
    else res.status(400).send("Project uuid not found");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.get = async (req, res) => {
  try {
    if (!(await hasPerms(req.user.uid, req.params.uuid)))
      return res.status(401).send({
        success: false,
        error: "Token missing. Authentication required.",
      });

    const project = await Projects.findByPk(req.params.uuid);

    if (project) res.status(200).json(project);
    else res.status(400).send("Project uuid not found");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.list = async (req, res) => {
  try {
    const projects = await Projects.findAll({
      where: {
        ownerUid: req.user.uid,
      },
      order: [["updatedAt", "DESC"]],
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.delete = async (req, res) => {
  try {
    if (!(await hasPerms(req.user.uid, req.params.uuid)))
      return res.status(401).send({
        success: false,
        error: "Token missing. Authentication required.",
      });

    const result = await Projects.destroy({
      where: {
        uuid: req.params.uuid,
        ownerUid: req.user.uid,
      },
      limit: 1,
    });

    if (result >= 1) res.status(200).json({ success: true });
    else res.status(400).send("Project uuid not found");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.resetPrivateKey = async (req, res) => {
  try {
    if (!(await hasPerms(req.user.uid, req.params.uuid)))
      return res.status(401).send({
        success: false,
        error: "Token missing. Authentication required.",
      });

    const [rowCount, updatedUser] = await Projects.update(
      {
        privateKey: randomstring.generate(22),
      },
      {
        where: {
          uuid: req.params.uuid,
          ownerUid: req.user.uid,
        },
        limit: 1,
        returning: true,
      }
    );

    if (rowCount === 1) res.status(200).json(updatedUser);
    else res.status(400).send("Project uuid not found");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

async function hasPerms(uid, projectUuid) {
  const project = await Projects.findOne({
    where: {
      uuid: projectUuid,
      ownerUid: uid,
    },
  });

  return project ? true : false;
}

module.exports.hasPerms = hasPerms;
