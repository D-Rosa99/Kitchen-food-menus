require("./init/db-startUp")();
const config = require("config");
const express = require("express");
const app = express();
require("./init/api-startUp")(app);

if (!config.get("JWTkey")) {
  console.error("FATA ERROR: JWTkey is not define");
  process.exit(1);
}

process.on("uncaughtException", () => {
  console.log("There was an error, the execution will end");
  process.exit(1);
});

process.on("unhandledRejection", () => {
  console.log("There was an error, the execution will end");
  process.exit(1);
});

const port = process.env.PORT ? process.env.PORT : 3000;
app.listen(port, console.log(`Server running on port ${port}!`));
