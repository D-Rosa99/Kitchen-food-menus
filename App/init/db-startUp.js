const mongoose = require("mongoose");
const logger = require("../utils/logger");
const config = require("config");

module.exports = function() {
  const db = config.get("db");
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => logger.info(`Database up on ${db}`))
    .catch(err => logger.info(err));
};
