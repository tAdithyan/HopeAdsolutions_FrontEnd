import axiosInstance from "../config/axios";

export const trackVisitorLocation = async (locationData) => {
    try {
        const res = await axiosInstance.post("/analytics/track-visitor", locationData);
        return res.data;
    } catch (error) {
        console.error("Error sending location data to backend:", error);
        throw error;
    }
};
