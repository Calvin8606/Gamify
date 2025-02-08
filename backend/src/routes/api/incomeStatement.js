const express = require("express");
const IncomeStatement = require("../../models/IncomeStatement");

const incomeStatementRouter = express.Router();

/**
 * @route   GET /api/incomeStatement/:id
 * @desc    Get an income statement
 * @access  Public (can be restricted later)
 */
incomeStatementRouter.get("/:id", async (req, res) => {
    try {
        const incomeStatement = await IncomeStatement.findById(req.params.id);
        if (!incomeStatement) {
            return res
                .status(404)
                .json({ message: "Income statement not found" });
        }
        res.status(200).json(incomeStatement);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching income statement",
            error: error.message,
        });
    }
});

/**
 * @route   POST /api/incomeStatement/upload
 * @desc    Upload an income statement
 * @access  Public (can be restricted later)
 */
incomeStatementRouter.post("/upload", async (req, res) => {
    try {
        const {
            userId,
            companyName,
            period,
            revenue,
            costOfGoodsSold,
            operatingExpenses,
            depreciation,
            amortization,
            interestExpense,
            taxExpense,
        } = req.body;

        // Validate required fields
        if (!userId || !companyName || !period) {
            return res.status(400).json({
                message:
                    "Missing required fields: userId, companyName, period.",
            });
        }

        // Create a new income statement entry
        const newIncomeStatement = new IncomeStatement({
            userId,
            companyName,
            period,
            revenue,
            costOfGoodsSold,
            operatingExpenses,
            depreciation,
            amortization,
            interestExpense,
            taxExpense,
        });

        await newIncomeStatement.save();

        res.status(201).json({
            message: "Income Statement uploaded successfully!",
            incomeStatement: newIncomeStatement,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = incomeStatementRouter;
