const express = require("express");
const User = require("../../models/User");

const userRouter = express.Router();

// POST /api/user/register
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

// GET /api/user/:id
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

// PUT /api/user/:id
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

// DELETE /api/user/:id
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

module.exports = userRouter;
