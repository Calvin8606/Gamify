const express = require("express");
const IncomeStatement = require("../../models/IncomeStatement");
const User = require("../../models/User");
require("dotenv").config();
const multer = require("multer");
const csvParser = require("csv-parser");
const axios = require("axios");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });

const incomeStatementRouter = express.Router();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = process.env.GROQ_API_URL;

/**
 * @route   GET /api/incomeStatement/:id
 * @desc    Get an income statement
 * @access  Public (can be restricted later)
 */
incomeStatementRouter.get("/:id", async (req, res) => {
    try {
        const incomeStatement = await IncomeStatement.findById(req.params.id);
        if (!incomeStatement) {
            return res
                .status(404)
                .json({ message: "Income statement not found" });
        }
        res.status(200).json(incomeStatement);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching income statement",
            error: error.message,
        });
    }
});

/**
 * @route   POST /api/incomeStatement/upload
 * @desc    Upload an income statement and reward user with 50 points
 * @access  Public (can be restricted later)
 */
incomeStatementRouter.post("/upload", async (req, res) => {
    try {
        const {
            userId,
            companyName,
            period,
            revenue,
            costOfGoodsSold,
            operatingExpenses,
            depreciation,
            amortization,
            interestExpense,
            taxExpense,
        } = req.body;

        // Validate required fields
        if (!userId || !companyName || !period) {
            return res.status(400).json({
                message:
                    "Missing required fields: userId, companyName, period.",
            });
        }

        // Create a new income statement entry
        const newIncomeStatement = new IncomeStatement({
            userId,
            companyName,
            period,
            revenue,
            costOfGoodsSold,
            operatingExpenses,
            depreciation,
            amortization,
            interestExpense,
            taxExpense,
        });

        const savedIncomeStatement = await newIncomeStatement.save();

        // Award 50 points to the user
        const user = await User.findById(userId);
        if (user) {
            user.totalScore += 50;
            await user.save();
        }

        res.status(201).json({
            message: "Income Statement uploaded successfully!",
            incomeStatement: savedIncomeStatement,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

/**
 * @route   POST /api/incomeStatement/uploadCSVWithAI/:userId
 * @desc    Upload income statement CSV and return IncomeState model JSON response
 * @access  Public (can be restricted later)
 */
incomeStatementRouter.post(
    "/uploadCSVWithAI/:userId",
    upload.single("file"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded." });
            }

            const rawCSVData = [];
            const filePath = req.file.path;

            // Extract userId from the URL
            const userId = req.params.userId;
            if (!userId) {
                return res
                    .status(400)
                    .json({ message: "User ID is required in the URL." });
            }

            // Read CSV file
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on("data", (row) => {
                    rawCSVData.push(row);
                })
                .on("end", async () => {
                    // Delete file after reading
                    fs.unlinkSync(filePath);

                    // Define the IncomeStatement model structure for Groq
                    const modelExample = {
                        companyName: "TechCorp Inc.",
                        period: "Q1 2024",
                        revenue: 100000,
                        costOfGoodsSold: 40000,
                        operatingExpenses: 20000,
                        operatingIncome: 40000,
                        depreciation: 5000,
                        amortization: 3000,
                        interestExpense: 2000,
                        taxExpense: 5000,
                        netIncome: 25000,
                    };

                    // Send CSV data to Groq API for transformation
                    const groqResponse = await axios.post(
                        GROQ_API_URL,
                        {
                            model: "llama-3.3-70b-versatile",
                            messages: [
                                {
                                    role: "system",
                                    content: `You are an AI that converts CSV data into the exact JSON format of an IncomeStatement model. 
                                    Given a CSV dataset with unknown headers, you must correctly map the columns to match the following model structure: 
                                    ${JSON.stringify(modelExample)}. 
                                    Any missing fields should be set to 0. Some column names may be slightly different. If a column does not belong, ignore it. The period should always follow the format YEAR-QUARTER (2023-Q3). Respond with JSON only, no text. There may be multiple entries.`,
                                },
                                {
                                    role: "user",
                                    content: `Convert the following CSV data into the IncomeStatement model format:\n${JSON.stringify(
                                        rawCSVData
                                    )}`,
                                },
                            ],
                            temperature: 0.2,
                        },
                        {
                            headers: {
                                "Authorization": `Bearer ${GROQ_API_KEY}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    const structuredData =
                        groqResponse.data?.choices?.[0]?.message?.content;

                    if (!structuredData) {
                        return res.status(500).json({
                            message: "Failed to parse CSV data using AI.",
                        });
                    }

                    // Parse JSON response from Groq API
                    const parsedData = JSON.parse(structuredData);

                    // Assign userId to each entry before saving to MongoDB
                    parsedData.forEach((entry) => {
                        entry.userId = userId;
                    });

                    // Insert structured data into MongoDB
                    await IncomeStatement.insertMany(parsedData);

                    res.status(201).json({
                        message: "CSV processed and structured using AI",
                        entriesAdded: parsedData.length,
                        data: parsedData,
                    });
                });
        } catch (error) {
            console.error("Error processing CSV:", error);
            res.status(500).json({
                message: "Server Error",
                error: error.message,
            });
        }
    }
);

module.exports = incomeStatementRouter;
