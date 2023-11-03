const categoryRouters = require("express").Router();
const { categoryController } = require("../controllers");

categoryRouters.get("/", categoryController.getCategory);
module.exports = categoryRouters;
