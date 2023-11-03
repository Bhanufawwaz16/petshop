const authRouters = require("express").Router();
const { authControllers } = require("../controllers");

authRouters.post("/register", authControllers.register);
authRouters.post("/login", authControllers.login);
module.exports = authRouters;
