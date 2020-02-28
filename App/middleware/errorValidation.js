const logger = require("../utils/logger");

module.exports = (error, req, res) => {
  logger.error(error);
  return res.status(500).send(`Something went wrong ${error}`);
};
