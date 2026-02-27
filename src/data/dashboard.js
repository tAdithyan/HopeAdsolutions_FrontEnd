import axiosInstance from "../config/axios";

export const getDashboardStats = async () => {
    try {
        const res = await axiosInstance.get("/dashboard/stats");
        return res.data.data;
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        throw error;
    }
};
