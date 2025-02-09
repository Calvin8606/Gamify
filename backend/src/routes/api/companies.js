const express = require("express");
const BalanceSheet = require("../../models/BalanceSheet");
const IncomeStatement = require("../../models/IncomeStatement");

const companiesRouter = express.Router();

/**
 * @route   GET /api/companies/bs/:id
 * @desc    Fetch unique company names from balance sheets for a specific user
 * @access  Public
 */
companiesRouter.get("/bs/:id", async (req, res) => {
    try {
        const { id: userId } = req.params; // Extract user ID from params

        const companies = await BalanceSheet.distinct("companyName", {
            userId,
        }); // Get unique company names where userId matches
        res.json(companies);
    } catch (error) {
        console.error(
            "❌ Error fetching companies from balance sheets:",
            error
        );
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

/**
 * @route   GET /api/companies/is/:id
 * @desc    Fetch unique company names from income statements for a specific user
 * @access  Public
 */
companiesRouter.get("/is/:id", async (req, res) => {
    try {
        const { id: userId } = req.params; // Extract user ID from params

        const companies = await IncomeStatement.distinct("companyName", {
            userId,
        }); // Get unique company names where userId matches
        res.json(companies);
    } catch (error) {
        console.error(
            "❌ Error fetching companies from income statements:",
            error
        );
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = companiesRouter;
