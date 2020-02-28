const express = require("express");
const Router = express.Router();

const bill = require("./bill-controllers");

Router.get("/", bill.getAllBills);

Router.get("/:date", bill.getBill);

Router.post("/", bill.addBill);

module.exports = Router;
