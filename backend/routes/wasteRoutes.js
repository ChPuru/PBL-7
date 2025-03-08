const express = require("express");
const WasteTransaction = require("../models/WasteTransaction");
const User = require("../models/User");
const { calculatePoints } = require("../utils/pointsSystem");

const router = express.Router();

//  New Route: Update Bin Full Status
router.post("/bin-status", async (req, res) => {
    const { binFull } = req.body;
    if (binFull) {
        console.log("🚨 Alert: The bin is full!");
        return res.json({ success: true, message: "Bin full status updated" });
    }
    res.json({ success: true, message: "Bin is not full" });
});

//  Updated: Deposit Waste & Award Points
router.post("/deposit", async (req, res) => {
    const { userId, wasteType, weight } = req.body;
    const pointsEarned = calculatePoints(wasteType, weight);

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.points += pointsEarned;
        await user.save();

        const transaction = new WasteTransaction({ user: userId, wasteType, weight, pointsEarned });
        await transaction.save();

        res.json({ success: true, message: "Waste recorded & points awarded!", pointsEarned });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
