const express = require("express");
const User = require("../../models/User");
const badges = require("../../models/BadgesEnum");

const userRouter = express.Router();

/**
 * @route   POST /api/user/register
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
 * @route   POST /api/user/login
 * @desc    Authenticate user & return JWT
 * @access  Public
 */
userRouter.post("/login", async (req, res) => {
    try {
        console.log("Attempting Login");
        const { email, password } = req.body;
        console.log(`Body: ${email} ${password}`);

        // 🔍 Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "❌ User not found. Please sign up." });
        }

        // 🔐 Compare passwords
        const isMatch = password == user.password;
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "❌ Incorrect password. Try again." });
        }
        console.log("Successful Login");
        res.status(200).json({
            message: "✅ Login successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                totalScore: user.totalScore,
                badges: user.badges,
                completedQuiz: user.completedQuiz,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
        console.log("Error:", error);
    }
});

/**
 * @route   GET /api/user/:id
 * @desc    Get a user & award badges based on totalScore
 * @access  Public (can be restricted later)
 */
userRouter.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 🎖️ Badge Levels
        const badgeLevels = [
            { threshold: 0, badge: "Bronze" },
            { threshold: 50, badge: "Silver" },
            { threshold: 100, badge: "Gold" },
            { threshold: 200, badge: "Diamond" },
        ];

        // Check which badges the user is missing
        const newBadges = badgeLevels
            .filter(
                ({ threshold, badge }) =>
                    user.totalScore > threshold && !user.badges.includes(badge)
            )
            .map(({ badge }) => badge);

        // 🎯 Only update if there are new badges to add
        if (newBadges.length > 0) {
            user.badges.push(...newBadges);
            await user.save();
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
 * @route   PUT /api/user/:id
 * @desc    Update a user
 * @access  Public (can be restricted later)
 */
userRouter.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
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
 * @route   DELETE /api/user/:id
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
 * @route   POST /api/user/:id/reward/badge
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
        if (badge === "Rockstar") {
            user.completedQuiz = true;
        }
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
 * @route   POST /api/user/:id/reward/points
 * @desc    Add points to a user
 * @access  Public (can be restricted later)
 */
userRouter.post("/:id/reward/points", async (req, res) => {
    console.log("Rewarding points to user");
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

        console.log(`Old score: ${user.totalScore}, Adding points: ${points}`);

        // Add points to totalScore
        user.totalScore += points;

        console.log(`New score: ${user.totalScore}`);
        // Save updated user
        await user.save();
        console.log("Points added successfully");
        res.status(200).json({ message: "Points added successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = userRouter;
