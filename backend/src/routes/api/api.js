const express = require("express");

const userRouter = require("./user");
const profileRouter = require("./profile");
const balanceSheetRouter = require("./balanceSheet");

const apiRouter = express.Router();
apiRouter.use("/user", userRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/balanceSheet", balanceSheetRouter);

module.exports = apiRouter;
