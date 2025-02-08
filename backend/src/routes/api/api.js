const express = require("express");

const userRouter = require("./user");
const profileRouter = require("./profile");
const balanceSheetRouter = require("./balanceSheet");
const incomeStatementRouter = require("./incomeStatement");
const calcRouter = require("./calc");
const groqRouter = require("./groq");

const apiRouter = express.Router();
apiRouter.use("/user", userRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/balanceSheet", balanceSheetRouter);
apiRouter.use("/incomeStatement", incomeStatementRouter);
apiRouter.use("/calc", calcRouter);
apiRouter.use("/groq", groqRouter);

module.exports = apiRouter;
