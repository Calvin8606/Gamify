const express = require("express");
const IncomeStatement = require("../../models/IncomeStatement");

const calcRouter = express.Router();

/**
 * @route   GET /api/calc/ebitda/company?companyName={}
 * @desc    Fetch all income statements for a company, calculate EBITDA for each, and return sorted results.
 * @access  Public
 */
calcRouter.get("/ebitda/company", async (req, res) => {
    try {
        console.log("🔍 Incoming request to /api/calc/ebitda/company");
        console.log("📝 Query Parameters:", req.query);

        const { companyName } = req.query;

        if (!companyName) {
            return res
                .status(400)
                .json({ message: "Company name is required" });
        }

        console.log(
            `📌 Fetching income statements for company: "${companyName}"`
        );

        // Fetch all income statements for the company
        const incomeStatements = await IncomeStatement.find({ companyName });

        if (incomeStatements.length === 0) {
            console.warn(
                `⚠️ No income statements found for company: ${companyName}`
            );
            return res
                .status(404)
                .json({
                    message: "No income statements found for this company",
                });
        }

        console.log("✅ Retrieved income statements. Calculating EBITDA...");

        // Compute EBITDA for each period
        const ebitdaData = incomeStatements.map((statement) => ({
            companyName: statement.companyName,
            period: statement.period,
            ebitdaValue:
                statement.operatingIncome +
                statement.depreciation +
                statement.amortization,
        }));

        console.log("✅ EBITDA Calculated:", ebitdaData);

        // Sort by period
        const sortedEbitdaData = ebitdaData
            .map((entry) => ({
                ...entry,
                sortedPeriod: /^[0-9]{4}-Q[1-4]$/.test(entry.period) // If already formatted correctly
                    ? entry.period
                    : `${entry.period.split(" ")[1]}-${
                          entry.period.split(" ")[0]
                      }`, // Convert "Q1 2024" → "2024-Q1"
            }))
            .sort((a, b) => a.sortedPeriod.localeCompare(b.sortedPeriod));

        console.log("🔢 Sorted EBITDA data:", sortedEbitdaData);

        res.json(sortedEbitdaData);
    } catch (error) {
        console.error("❌ Error fetching EBITDA data:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

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
