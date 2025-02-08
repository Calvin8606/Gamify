const express = require("express");
const IncomeStatement = require("../../models/IncomeStatement");

const calcRouter = express.Router();

/**
 * @route   POST /api/calc/ebitda
 * @desc    Calculate EBITDA from an income statement
 * @access  Public (can be restricted later)
 */
calcRouter.post("/ebitda", async (req, res) => {
    try {
        const { incomeStatementId } = req.body;

        // Validate input
        if (!incomeStatementId) {
            return res
                .status(400)
                .json({ message: "Income Statement ID is required." });
        }

        // Fetch the income statement
        const incomeStatement = await IncomeStatement.findById(
            incomeStatementId
        );
        if (!incomeStatement) {
            return res
                .status(404)
                .json({ message: "Income Statement not found." });
        }

        // Calculate EBITDA
        const { operatingIncome, depreciation, amortization } = incomeStatement;
        const EBITDA = operatingIncome + depreciation + amortization;

        res.status(200).json({
            message: "EBITDA calculated successfully",
            companyName: incomeStatement.companyName,
            period: incomeStatement.period,
            EBITDA,
            details: {
                operatingIncome,
                depreciation,
                amortization,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = calcRouter;
