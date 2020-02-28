const express = require("express");
const Router = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const food = require("./food-controllers");

Router.get("/", [authentication], food.getAllFoods);

Router.get("/:name", [authentication, authorization], food.getFoodByName);

Router.post("/", [authentication, authorization], food.addFood);

Router.delete("/:name", [authentication, authorization], food.deleteFood);

Router.put("/:name", [authentication, authorization], food.putFood);

module.exports = Router;
