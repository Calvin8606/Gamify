const mongoose = require("mongoose");

const incomeStatementSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, // Link to the user who uploaded it
    companyName: { type: String, required: true, trim: true }, // Company name
    period: { type: String, required: true, trim: true }, // e.g., "2024-Q1"

    revenue: { type: Number, required: true, default: 0 }, // Total revenue
    costOfGoodsSold: { type: Number, default: 0 }, // COGS (used for Gross Profit)
    operatingExpenses: { type: Number, default: 0 }, // Operating costs (excludes COGS)

    // EBITDA-related fields
    operatingIncome: { type: Number, default: 0 }, // EBIT (Earnings Before Interest & Taxes)
    depreciation: { type: Number, default: 0 }, // Non-cash asset reduction
    amortization: { type: Number, default: 0 }, // Non-cash expense for intangible assets
    interestExpense: { type: Number, default: 0 }, // Interest on loans
    taxExpense: { type: Number, default: 0 }, // Corporate tax

    netIncome: { type: Number, default: 0 }, // Net profit after all expenses

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Auto-calculate financial metrics before saving
incomeStatementSchema.pre("save", function (next) {
    // Operating Income = Revenue - COGS - Operating Expenses
    this.operatingIncome =
        this.revenue - this.costOfGoodsSold - this.operatingExpenses;

    // Net Income = Operating Income - Interest - Taxes
    this.netIncome =
        this.operatingIncome - this.interestExpense - this.taxExpense;

    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("IncomeStatement", incomeStatementSchema);
