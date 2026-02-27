import axiosInstance from "../config/axios";


export const getOffers = async () => {
    try {
        const response = await axiosInstance.get("/offers");
        return response.data;
    } catch (error) {
        console.error("Error fetching offers:", error);
        throw error;
    }
}


export const createOffer = async (offerData) => {
    try {
        const response = await axiosInstance.post('/offers', offerData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating offer:", error);
        throw error;
    }
};

export const updateOffer = async (id, offerData) => {
    try {
        const response = await axiosInstance.put(`/offers/${id}`, offerData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating offer:", error);
        throw error;
    }
};

export const deleteOffer = async (id) => {
    try {
        const response = await axiosInstance.delete(`/offers/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting offer:", error);
        throw error;
    }
};