const adminRouters = require("express").Router();
const { adminController } = require("../controllers");

adminRouters.get("/user/:id", adminController.getAdmin);
adminRouters.post("/user", adminController.addAdmin);
module.exports = adminRouters;
