import api from "../api/apiService";

export const checkBinStatus = async () => {
    try {
        const response = await api.get("/waste/bin-status");
        return response.data;
    } catch (error) {
        console.error("Error fetching bin status:", error);
        return { binFull: false };
    }
};
