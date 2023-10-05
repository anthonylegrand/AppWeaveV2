require("dotenv").config();
const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("./../../appweave-firebase.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const { Users } = global.sequelize.models;

const firebaseAuthenticate = async (req, res, next) => {
  const token = req.headers["authorization"] || req.cookies.authorization;
  try {
    if (!token || !token.startsWith("Bearer "))
      throw "Token missing. Authentication required.";

    const decodedToken = await firebaseAdmin
      .auth()
      .verifyIdToken(token.replace("Bearer ", ""));
    if (decodedToken) {
      const { uid, name, email, email_verified } = decodedToken;

      const user = await Users.findOrCreate({
        where: { uid },
        defaults: {
          email,
          email_verified,
          anonymous: decodedToken.provider_id === "anonymous",
        },
      });

      req.user = { name, email_verified, ...user[0]?.dataValues };

      next();
    } else throw "Token missing. Authentication required.";
  } catch (error) {
    const acceptHeader = req.get("Accept");
    if (acceptHeader && !acceptHeader.includes("application/json"))
      return res.redirect("/");
    else
      return res.status(401).send({
        success: false,
        error: "Token missing. Authentication required.",
      });
  }
};

module.exports = { firebaseAuthenticate };
