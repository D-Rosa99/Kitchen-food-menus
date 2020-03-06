const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("../client/auth-router");
const billRouters = require("../bill/bill-routers");
const clientRouters = require("../client/client-routers");
const error = require("../middleware/errorValidation");
const foodCategoryRouters = require("../foodCategory/foodCategory-routers");
const foodRouters = require("../food/food-routers");
const ingredientRouters = require("../ingredient/ingredient-routers");
const suggestionRouters = require("../sugestions/suggestion-routers");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../utils/swaggerDocument.json");

module.exports = function(app) {
  app.use(cors());
  app.use(
    "/api/docs",
    function(req, res, next) {
      swaggerDocument.host = req.get("host");
      req.swaggerDoc = swaggerDocument;
      next();
    },
    swaggerUi.serve,
    swaggerUi.setup()
  );
  app.use(morgan("dev"));
  app.use(express.json());
  app.use("/api/auth", authRouter);
  app.use("/api/food", foodRouters);
  app.use("/api/ingredient", ingredientRouters);
  app.use("/api/client", clientRouters);
  app.use("/api/food-category", foodCategoryRouters);
  app.use("/api/bill", billRouters);
  app.use("/api/suggestion", suggestionRouters);
  app.use(error);
};
