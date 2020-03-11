require("express-async-errors");
require("./init/db-startUp")();
const config = require("config");
const logger = require("./utils/logger");
const express = require("express");
const app = express();
require("./init/api-startUp")(app);

if (!config.get("JWTkey")) {
  logger.error("FATA ERROR: JWTkey is not define");
  process.exit(1);
}

process.on("uncaughtException", err => {
  logger.error(err);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  logger.error(err);
  process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, logger.info(`Server running on port ${port}!`));
