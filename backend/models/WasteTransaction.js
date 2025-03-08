const mongoose = require("mongoose");

const WasteTransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  wasteType: { type: String, required: true }, // Plastic, Organic, Metal, etc.
  weight: { type: Number, required: true }, // in grams
  pointsEarned: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WasteTransaction", WasteTransactionSchema);
