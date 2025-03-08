import axios from "axios";

const API_BASE_URL = "http://YOUR_BACKEND_IP/api";  // Replace with actual backend IP

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// 🔹 Fetch User Points
export const fetchUserPoints = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}`);
        return response.data.points;
    } catch (error) {
        console.error("Error fetching points:", error);
        return 0;
    }
};

// 🔹 Fetch Bin Status
export const fetchBinStatus = async () => {
    try {
        const response = await api.get("/waste/bin-status");
        return response.data.binFull;
    } catch (error) {
        console.error("Error fetching bin status:", error);
        return false;
    }
};

export default api;
