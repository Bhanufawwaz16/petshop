const productsRouter = require("express").Router();
const { productsController } = require("../controllers");
const { fileUploader } = require("../middleware/multer");

productsRouter.get("/", productsController.getProducts);
productsRouter.post(
  "/",
  fileUploader({ destinationFolder: "products", prefix: "PING" }).single(
    "product_image"
  ),
  productsController.createProducts
);
productsRouter.patch(
  "/:id",
  fileUploader({ destinationFolder: "products", prefix: "PING" }).single(
    "product_image"
  ),
  productsController.updateProduct
);
module.exports = productsRouter;
