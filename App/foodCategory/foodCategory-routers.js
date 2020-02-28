const express = require("express");
const Router = express.Router();

const foodCategory = require("./foodCategory-controllers");

Router.get("/", foodCategory.getAllFoodCategories);

Router.get("/:name", foodCategory.getFoodCategoryByName);

Router.post("/", foodCategory.addFoodCategory);

Router.delete("/:name", foodCategory.deleteFoodCategory);

Router.put("/:name", foodCategory.putFoodCategory);

module.exports = Router;
