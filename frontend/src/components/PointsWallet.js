import React, { useEffect, useState } from "react";
import axios from "../api/apiService";

const PointsWallet = ({ userId }) => {
    const [points, setPoints] = useState(0);

    useEffect(() => {
        async function fetchPoints() {
            try {
                const response = await axios.get(`/user/${userId}/points`);
                setPoints(response.data.points);
            } catch (error) {
                console.error("Error fetching points:", error);
            }
        }
        fetchPoints();
    }, [userId]);

    return (
        <div>
            <h2>Waste Points Wallet</h2>
            <p>User ID: {userId}</p>
            <p>Points: {points}</p>
        </div>
    );
};

export default PointsWallet;
