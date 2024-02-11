const transHRouters = require("express").Router();
const { transactionHeaderController } = require("../controllers");
const { fileUploader } = require("../middleware/multer");

transHRouters.get("/sales_report", transactionHeaderController.getSalesReport);

transHRouters.patch(
  "/user_payment/:id",
  fileUploader({ destinationFolder: "transHead", prefix: "PAYIMG" }).single(
    "user_payment"
  ),
  transactionHeaderController.setTransImage
);
module.exports = transHRouters;
