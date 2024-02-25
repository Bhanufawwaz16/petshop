const userRouters = require("express").Router();
const { userController } = require("../controllers");

userRouters.get("/", userController.getUser);
userRouters.post("/", userController.createSchedule);
module.exports = userRouters;
