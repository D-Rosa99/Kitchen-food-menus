const express = require("express");
const Router = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const ingredient = require("./ingredient-controllers");

Router.get("/", [authentication, authorization], ingredient.getAllIngredients);

Router.get(
  "/:name",
  [authentication, authorization],
  ingredient.getIngredientByName
);

Router.post("/", [authentication, authorization], ingredient.addIngredient);

Router.delete(
  "/:name",
  [authentication, authorization],
  ingredient.deleteIngredient
);

Router.put("/:name", [authentication, authorization], ingredient.putIngredient);

module.exports = Router;
