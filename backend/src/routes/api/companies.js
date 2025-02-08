const express = require("express");
const BalanceSheet = require("../../models/BalanceSheet");
const IncomeStatement = require("../../models/IncomeStatement");

const companiesRouter = express.Router();

/**
 * @route   GET /api/companies
 * @desc    Fetch unique company names from balance sheets
 * @access  Public
 */
companiesRouter.get("/bs", async (req, res) => {
    try {
        const companies = await BalanceSheet.distinct("companyName"); // Get unique company names
        res.json(companies);
    } catch (error) {
        console.error("❌ Error fetching companies:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

/**
 * @route   GET /api/companies
 * @desc    Fetch unique company names from income statements
 * @access  Public
 */
companiesRouter.get("/is", async (req, res) => {
    try {
        const companies = await IncomeStatement.distinct("companyName"); // Get unique company names
        res.json(companies);
    } catch (error) {
        console.error("❌ Error fetching companies:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = companiesRouter;
