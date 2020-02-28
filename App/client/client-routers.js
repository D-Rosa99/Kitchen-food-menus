const express = require("express");
const Router = express.Router();

const client = require("./client-controllers");

Router.get("/", client.getAllClients);

Router.get("/:email", client.getClientByName);

Router.post("/", client.addClient);

Router.delete("/:email", client.deleteClient);

Router.put("/:email", client.putClient);

module.exports = Router;
