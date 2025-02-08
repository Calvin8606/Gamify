const express = require("express");
const BalanceSheet = require("../../models/BalanceSheet");
const User = require("../../models/User");

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

/**
 * @route   POST /api/balanceSheet/upload
 * @desc    Upload a balance sheet and reward user with 50 points
 * @access  Public (can be restricted later)
 */
balanceSheetRouter.post("/upload", async (req, res) => {
    try {
        const {
            userId,
            companyName,
            period,
            assets,
            liabilities,
            shareholdersEquity,
        } = req.body;

        // Validate required fields
        if (!userId || !companyName || !period) {
            return res.status(400).json({
                message:
                    "Missing required fields: userId, companyName, period.",
            });
        }

        // Create a new balance sheet entry
        const newBalanceSheet = new BalanceSheet({
            userId,
            companyName,
            period,
            assets,
            liabilities,
            shareholdersEquity,
        });

        const savedBalanceSheet = await newBalanceSheet.save();

        // Award 50 points to the user
        const user = await User.findById(userId);
        if (user) {
            user.totalScore += 50;
            await user.save();
        }

        res.status(201).json({
            message: "Balance Sheet uploaded successfully!",
            incomeStatement: savedBalanceSheet,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error uploading balance sheet",
            error: error.message,
        });
    }
});

module.exports = balanceSheetRouter;
