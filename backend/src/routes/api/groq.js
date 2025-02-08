const express = require("express");
const axios = require("axios");
require("dotenv").config();

const groqRouter = express.Router();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = process.env.GROQ_API_URL;

/**
 * @route   POST /api/groq
 * @desc    Forward user message to GroqCloud and return response
 * @access  Public (can be restricted later)
 */
groqRouter.post("/", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "Message is required." });
        }

        // Construct the request payload for GroqCloud
        const payload = {
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: message }],
        };

        // Send request to GroqCloud API
        const response = await axios.post(GROQ_API_URL, payload, {
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        // Extract and send back GroqCloud's response
        const assistantMessage =
            response.data.choices[0]?.message?.content ||
            "No response received";
        res.status(200).json({
            response: assistantMessage,
        });
    } catch (error) {
        console.error(
            "Error contacting GroqCloud API:",
            error.response?.data || error.message
        );
        res.status(500).json({
            message: "Server Error",
            error: error.response?.data || error.message,
        });
    }
});

module.exports = groqRouter;
