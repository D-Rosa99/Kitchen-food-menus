const express = require("express");
const Router = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const bill = require("./bill-controllers");

Router.get("/", [authentication, authorization], bill.getAllBills);

Router.get("/:date", [authentication, authorization], bill.getBill);

Router.post("/", [authentication, authorization], bill.addBill);

module.exports = Router;
