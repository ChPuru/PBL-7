const WasteTransaction = require('../models/WasteTransaction');
const { sendNotification } = require('../utils/notificationService');
const { updatePoints } = require('../utils/pointsSystem');

// Update bin status (ESP32 sends data here)
exports.updateBinStatus = async (req, res) => {
    try {
        const { binFull } = req.body;

        if (binFull) {
            sendNotification("🚨 Bin is Full! Please empty it.");
        }

        res.status(200).json({ message: "Bin status updated." });
    } catch (error) {
        res.status(500).json({ error: "Error updating bin status." });
    }
};

// Classify waste (AI Model prediction)
exports.classifyWaste = async (req, res) => {
    try {
        const { userId, wasteType } = req.body;

        // Store waste transaction in DB
        const transaction = new WasteTransaction({ userId, wasteType });
        await transaction.save();

        // Assign reward points
        const points = updatePoints(wasteType);
        
        res.status(200).json({ message: "Waste classified successfully.", points });
    } catch (error) {
        res.status(500).json({ error: "Error classifying waste." });
    }
};

// Get waste statistics
exports.getWasteStats = async (req, res) => {
    try {
        const stats = await WasteTransaction.aggregate([
            { $group: { _id: "$wasteType", count: { $sum: 1 } } }
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: "Error fetching stats." });
    }
};
