const express = require("express");
const Router = express.Router();

const food = require("./food-controllers");

Router.get("/", food.getAllFoods);

Router.get("/:name", food.getFoodByName);

Router.post("/", food.addFood);

Router.delete("/:name", food.deleteFood);

Router.put("/:name", food.putFood);

module.exports = Router;
