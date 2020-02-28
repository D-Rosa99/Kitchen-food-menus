const express = require("express");
const Router = express.Router();

const ingredient = require("./ingredient-controllers");

Router.get("/", ingredient.getAllIngredients);

Router.get("/:name", ingredient.getIngredientByName);

Router.post("/", ingredient.addIngredient);

Router.delete("/:name", ingredient.deleteIngredient);

Router.put("/:name", ingredient.putIngredient);

module.exports = Router;
