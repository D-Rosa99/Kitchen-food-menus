const mongoose = require("mongoose");
const logger = require("../utils/logger");

module.exports = function() {
  mongoose
    .connect("mongodb://localhost:27017/KitchenFoodMenus", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => logger.info("Database up!"))
    .catch(err => logger.info(err));
};
