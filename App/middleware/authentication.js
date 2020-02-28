const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = jwt.verify(req.header("x-auth-JWTkey"), config.get("JWTkey"));
    return next();
  } catch (error) {
    return res.status(400).send("Invalid token!");
  }
};
