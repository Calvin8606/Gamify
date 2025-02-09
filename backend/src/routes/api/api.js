const express = require("express");

const userRouter = require("./user");
const balanceSheetRouter = require("./balanceSheet");
const incomeStatementRouter = require("./incomeStatement");
const calcRouter = require("./calc");
const groqRouter = require("./groq");
const companiesRouter = require("./companies");

const apiRouter = express.Router();
apiRouter.use("/user", userRouter);
apiRouter.use("/balanceSheet", balanceSheetRouter);
apiRouter.use("/incomeStatement", incomeStatementRouter);
apiRouter.use("/calc", calcRouter);
apiRouter.use("/groq", groqRouter);
apiRouter.use("/companies", companiesRouter);

module.exports = apiRouter;
