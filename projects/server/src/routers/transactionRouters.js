const transactionRouters = require("express").Router();
const { transactionController } = require("../controllers");

transactionRouters.post(
  "/create_transaction/:id",
  transactionController.createTransaction
);
transactionRouters.get(
  "/get_transaction/:id",
  transactionController.getTransactionHead
);
module.exports = transactionRouters;
