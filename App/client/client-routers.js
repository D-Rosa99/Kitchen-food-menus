const express = require("express");
const Router = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const client = require("./client-controllers");

Router.get("/", [authentication, authorization], client.getAllClients);

Router.get("/:email", [authentication, authorization], client.getClientByName);

Router.post("/", [authentication, authorization], client.addClient);

Router.delete("/:email", [authentication, authorization], client.deleteClient);

Router.put("/:email", [authentication, authorization], client.putClient);

module.exports = Router;
