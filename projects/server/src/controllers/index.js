const authControllers = require("./authControllers");
const categoryController = require("./categoryController");
const productsController = require("./productsController");
const cartController = require("./cartControllers");
const transactionController = require("./transactionController");
const transactionHeaderController = require("./transactionHeaderController");
const adminController = require("./adminController");
const userController = require("./userController");

module.exports = {
  authControllers,
  categoryController,
  productsController,
  cartController,
  transactionController,
  transactionHeaderController,
  adminController,
  userController,
};
