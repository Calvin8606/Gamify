const express = require("express");
const User = require("../../models/User");

const userRouter = express.Router();

// POST /api/user
userRouter.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, totalScore, badges } =
            req.body;
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            totalScore,
            badges,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message,
        });
    }
});

module.exports = userRouter;
