require("dotenv").config();

module.exports.getProfil = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports.logout = async (req, res) => {
  res.clearCookie("Authorization");
  res.status(200).json({ sucess: true });
};
