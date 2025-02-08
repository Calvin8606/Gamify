const express = require("express");
const BalanceSheet = require("../../models/BalanceSheet");

const balanceSheetRouter = express.Router();

/**
 * @route   GET /api/balanceSheet/:id
 * @desc    Get a balance sheet
 * @access  Public (can be restricted later)
 */
balanceSheetRouter.get("/:id", async (req, res) => {
    try {
        const balanceSheet = await BalanceSheet.findById(req.params.id);
        if (!balanceSheet) {
            return res.status(404).json({ message: "Balance sheet not found" });
        }
        res.status(200).json(balanceSheet);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching balance sheet",
            error: error.message,
        });
    }
});

module.exports = balanceSheetRouter;
