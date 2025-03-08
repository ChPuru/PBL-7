import React, { useState, useEffect } from "react";
import { fetchUserPoints, fetchBinStatus } from "../api/apiService";

const Dashboard = () => {
    const [points, setPoints] = useState(0);
    const [binFull, setBinFull] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            setPoints(await fetchUserPoints(userId));
        }
        setBinFull(await fetchBinStatus());
    };

    return (
        <div>
            <h1>📊 Dashboard</h1>
            <p>💰 Total Points: <strong>{points}</strong></p>
            <p>🗑️ Bin Status: <strong>{binFull ? "FULL 🚨" : "Available ✅"}</strong></p>
        </div>
    );
};

export default Dashboard;
