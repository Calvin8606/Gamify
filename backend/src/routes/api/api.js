const express = require("express");

const userRouter = require("./user");
const profileRouter = require("./profile");

const apiRouter = express.Router();
apiRouter.use("/user", userRouter);
apiRouter.use("/profile", profileRouter);

module.exports = apiRouter;
