const mongoose = require("mongoose");

const balanceSheetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, // Link to the user who uploaded it
    companyName: { type: String, required: true, trim: true }, // Company name
    period: { type: String, required: true, trim: true }, // e.g., "Q1 2024" or "FY 2023"

    assets: {
        cash: { type: Number, default: 0 },
        accountsReceivable: { type: Number, default: 0 },
        inventory: { type: Number, default: 0 },
        totalAssets: { type: Number, default: 0 }, // Can be auto-calculated
    },

    liabilities: {
        accountsPayable: { type: Number, default: 0 },
        shortTermDebt: { type: Number, default: 0 },
        longTermDebt: { type: Number, default: 0 },
        totalLiabilities: { type: Number, default: 0 }, // Can be auto-calculated
    },

    shareholdersEquity: {
        commonStock: { type: Number, default: 0 },
        retainedEarnings: { type: Number, default: 0 },
        totalEquity: { type: Number, default: 0 }, // Can be auto-calculated
    },

    createdAt: { type: Date, default: Date.now },
});

// Auto-calculate totals before saving
balanceSheetSchema.pre("save", function (next) {
    this.assets.totalAssets =
        this.assets.cash +
        this.assets.accountsReceivable +
        this.assets.inventory;
    this.liabilities.totalLiabilities =
        this.liabilities.accountsPayable +
        this.liabilities.shortTermDebt +
        this.liabilities.longTermDebt;
    this.shareholdersEquity.totalEquity =
        this.shareholdersEquity.commonStock +
        this.shareholdersEquity.retainedEarnings;
    next();
});

module.exports = mongoose.model("BalanceSheet", balanceSheetSchema);
