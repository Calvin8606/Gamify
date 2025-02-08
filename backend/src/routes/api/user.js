const express = require("express");
const User = require("../../models/User");
const badges = require("../../models/BadgesEnum");

const userRouter = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Create a new user
 * @access  Public (can be restricted later)
 */
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

/**
 * @route   GET /api/users/:id
 * @desc    Get a user
 * @access  Public (can be restricted later)
 */
userRouter.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message,
        });
    }
});

/**
 * @route   PUT /api/users/:id
 * @desc    Update a user
 * @access  Public (can be restricted later)
 */
userRouter.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message,
        });
    }
});

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user
 * @access  Public (can be restricted later)
 */
userRouter.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error: error.message,
        });
    }
});

/**
 * @route   POST /api/users/:id/reward/badge
 * @desc    Reward a user with a badge
 * @access  Public (can be restricted later)
 */
userRouter.post("/:id/reward/badge", async (req, res) => {
    try {
        const { badge } = req.body;
        const user = await User.findById(req.params.id);
        // Check if badge is valid
        if (!badges.includes(badge)) {
            return res.status(400).json({ message: "Invalid badge" });
        }

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if user already has the badge
        if (user.badges.includes(badge)) {
            return res.status(400).json({ message: "Badge already awarded" });
        }

        // Add badge to user's badges
        user.badges.push(badge);
        await user.save();
        res.status(200).json({ message: "Badge awarded successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error awarding badge",
            error: error.message,
        });
    }
});

/**
 * @route   POST /api/users/:id/reward/points
 * @desc    Add points to a user
 * @access  Public (can be restricted later)
 */
userRouter.post("/:id/reward/points", async (req, res) => {
    try {
        const { points } = req.body;

        // Validate points (must be a number and greater than 0)
        if (!points || typeof points !== "number" || points <= 0) {
            return res.status(400).json({
                message: "Invalid points value. Must be a positive number.",
            });
        }

        // Find the user
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Initialize totalScore if not set
        if (!user.totalScore) {
            user.totalScore = 0;
        }

        // Add points to totalScore
        user.totalScore += points;

        // Save updated user
        await user.save();

        res.status(200).json({ message: "Points added successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = userRouter;
