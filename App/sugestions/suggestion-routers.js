const express = require("express");
const Router = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const suggestion = require("./suggestion-controllers");

/**
 * @swagger
 * /suggestions:
 *  get:
 *      description: Use to request all suggestions that clients send
 *      response:
 *          '200':
 *              description: A sucessful response
 */
Router.get("/", [authentication, authorization], suggestion.getAllSuggestions);

Router.post("/", [authentication], suggestion.addSuggestion);

module.exports = Router;
