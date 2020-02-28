const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = jwt.verify(req.header("x-auth-JWTkey"), config.get("JWTkey"));
  return token.role === "admin"
    ? next()
    : res
        .status(403)
        .send("You do not hace enouth permission to make this request");
};
