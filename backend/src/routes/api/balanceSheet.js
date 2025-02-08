const express = require("express");
const BalanceSheet = require("../../models/BalanceSheet");
const User = require("../../models/User");
require("dotenv").config();
const multer = require("multer");
const csvParser = require("csv-parser");
const axios = require("axios");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });

const balanceSheetRouter = express.Router();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = process.env.GROQ_API_URL;

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
            balanceSheet: savedBalanceSheet,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error uploading balance sheet",
            error: error.message,
        });
    }
});

/**
 * @route POST /api/balanceSheet/uploadCSVWithAI/:userId
 * @desc Upload balance statement CSV and return BalanceSheet model JSON response
 * @access Public (can be restricted later)
 */
balanceSheetRouter.post(
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

                    // Define the BalanceSheet model structure for Groq
                    const modelExample = {
                        companyName: "TechCorp Inc.",
                        period: "Q1 2024",
                        assets: {
                            cash: 100000,
                            accountsReceivable: 50000,
                            inventory: 30000,
                            totalAssets: 180000,
                        },
                        liabilities: {
                            accountsPayable: 40000,
                            shortTermDebt: 20000,
                            longTermDebt: 50000,
                            totalLiabilities: 110000,
                        },
                        shareholdersEquity: {
                            commonStock: 20000,
                            retainedEarnings: 50000,
                            totalEquity: 70000,
                        },
                    };

                    // Send CSV data to Groq API for transformation
                    const groqResponse = await axios.post(
                        GROQ_API_URL,
                        {
                            model: "llama-3.3-70b-versatile",
                            messages: [
                                {
                                    role: "system",
                                    content: `You are an AI that converts CSV data into the exact JSON format of a BalanceSheet model. 
                                    Given a CSV dataset with unknown headers, you must correctly map the columns to match the following model structure: 
                                    ${JSON.stringify(modelExample)}. 
                                    Any missing fields should be set to 0. Some column names may be slightly different. If a column does not belong, ignore it. Respond with JSON only, no text. There may be multiple entries.`,
                                },
                                {
                                    role: "user",
                                    content: `Convert the following CSV data into the BalanceSheet model format:\n${JSON.stringify(
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
                    await BalanceSheet.insertMany(parsedData);

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

module.exports = balanceSheetRouter;
