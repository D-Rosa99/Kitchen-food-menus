const express = require("express");

const authRouter = require("../client/auth-router");
const billRouters = require("../bill/bill-routers");
const clientRouters = require("../client/client-routers");
const error = require("../middleware/errorValidation");
const foodCategoryRouters = require("../foodCategory/foodCategory-routers");
const foodRouters = require("../food/food-routers");
const ingredientRouters = require("../ingredient/ingredient-routers");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/auth", authRouter);
  app.use("/api/food", foodRouters);
  app.use("/api/ingredient", ingredientRouters);
  app.use("/api/client", clientRouters);
  app.use("/api/food-category", foodCategoryRouters);
  app.use("/api/bill", billRouters);
  app.use(error);
};
