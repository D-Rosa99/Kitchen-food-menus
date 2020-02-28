const express = require("express");
const Router = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const foodCategory = require("./foodCategory-controllers");

Router.get(
  "/",
  [authentication, authorization],
  foodCategory.getAllFoodCategories
);

Router.get(
  "/:name",
  [authentication, authorization],
  foodCategory.getFoodCategoryByName
);

Router.post("/", [authentication, authorization], foodCategory.addFoodCategory);

Router.delete(
  "/:name",
  [authentication, authorization],
  foodCategory.deleteFoodCategory
);

Router.put(
  "/:name",
  [authentication, authorization],
  foodCategory.putFoodCategory
);

module.exports = Router;
