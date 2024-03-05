const userRouters = require("express").Router();
const { userController } = require("../controllers");

userRouters.get("/", userController.getUser);
userRouters.post("/", userController.createSchedule);
userRouters.get("/schedule", userController.getSchedule);
module.exports = userRouters;
