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

/**
 * @route   GET /api/calc/ebitda/company?companyName={}
 * @desc    Fetch EBITDA data filtered by company name, sorted by period correctly
 * @access  Public (can be restricted later)
 */
calcRouter.get("/ebitda/company", async (req, res) => {
    try {
        const { companyName } = req.query;

        if (!companyName) {
            return res
                .status(400)
                .json({ message: "Company name is required" });
        }

        const ebitdaData = await EBITDA.aggregate([
            { $match: { companyName } },
            {
                $addFields: {
                    sortedPeriod: {
                        $cond: [
                            {
                                $regexMatch: {
                                    input: "$period",
                                    regex: /^[0-9]{4}-Q[1-4]$/,
                                },
                            },
                            { $toString: "$period" }, // Keep existing format if already correct
                            {
                                $concat: [
                                    {
                                        $arrayElemAt: [
                                            { $split: ["$period", " "] },
                                            1,
                                        ],
                                    }, // Extract Year
                                    "-",
                                    {
                                        $arrayElemAt: [
                                            { $split: ["$period", " "] },
                                            0,
                                        ],
                                    }, // Extract Quarter
                                ],
                            },
                        ],
                    },
                },
            },
            { $sort: { sortedPeriod: 1 } }, // Sort by transformed period format
        ]);

        if (ebitdaData.length === 0) {
            return res
                .status(404)
                .json({ message: "No EBITDA data found for this company" });
        }

        res.json(ebitdaData);
    } catch (error) {
        console.error("Error fetching EBITDA data:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = calcRouter;
