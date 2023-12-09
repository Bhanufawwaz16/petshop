const transactionRouters = require("express").Router();
const { transactionController } = require("../controllers");

transactionRouters.post("/create_transaction/:id", transactionController.createTransaction);
module.exports = transactionRouters;
