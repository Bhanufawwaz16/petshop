const productsRouter = require("express").Router();
const { productsController } = require("../controllers");
const { fileUploader } = require("../middleware/multer");

productsRouter.post(
  "/",
  fileUploader({ destinationFolder: "products", prefix: "PING" }).single(
    "product_image"
  ),
  productsController.createProducts
);
module.exports = productsRouter;
