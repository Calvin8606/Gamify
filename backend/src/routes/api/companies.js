const express = require("express");
const BalanceSheet = require("../../models/BalanceSheet");

const companiesRouter = express.Router();

/**
 * @route   GET /api/companies
 * @desc    Fetch unique company names from balance sheets
 * @access  Public
 */
companiesRouter.get("/", async (req, res) => {
    try {
        const companies = await BalanceSheet.distinct("companyName"); // Get unique company names
        res.json(companies);
    } catch (error) {
        console.error("❌ Error fetching companies:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = companiesRouter;
