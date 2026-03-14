import axiosInstance from "../config/axios";

export const getClients = async () => {
    try {
        const response = await axiosInstance.get("/clients");
        return response.data;
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }
}

export const createClient = async (clientData) => {
    try {
        const response = await axiosInstance.post('/clients', clientData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating client:", error);
        throw error;
    }
};

export const updateClient = async (id, clientData) => {
    try {
        const response = await axiosInstance.put(`/clients/${id}`, clientData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating client:", error);
        throw error;
    }
};

export const deleteClient = async (id) => {
    try {
        const response = await axiosInstance.delete(`/clients/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting client:", error);
        throw error;
    }
};
