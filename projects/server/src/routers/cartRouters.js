const cartRouters = require("express").Router();
const { cartController } = require("../controllers");

cartRouters.get("/:user_id", cartController.getCartByUser);
cartRouters.post("/", cartController.addToCart);
cartRouters.delete("/:user_id", cartController.reduceCartOne);
module.exports = cartRouters;
