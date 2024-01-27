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
transactionRouters.get(
  "/get_transactions",
  transactionController.getTransactionHeaders
);

transactionRouters.patch("/:id", transactionController.updateTransaction);
module.exports = transactionRouters;
