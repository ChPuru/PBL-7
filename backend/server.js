const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const wasteRoutes = require("./routes/wasteRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/waste", wasteRoutes);
app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("✅ MongoDB Connected");
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(error => console.log("MongoDB Connection Error:", error));
