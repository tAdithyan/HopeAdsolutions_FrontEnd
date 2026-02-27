import axiosInstance from "../config/axios";

export const fetchBlogs = async () => {
    try {
        const response = await axiosInstance.get('/blogs');
        return response.data.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
};

export const fetchBlogById = async (id) => {
    try {
        const response = await axiosInstance.get(`/blogs/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching blog:", error);
        return null;
    }
};



export const createBlog = async (blogData) => {
    try {
        const response = await axiosInstance.post(`/blogs`, blogData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return response.data;
    } catch (error) {
        console.error("Error creating blog:", error);
        throw error;
    }
};

export const updateBlog = async (id, blogData) => {
    try {
        const response = await axiosInstance.put(`/blogs/${id}`, blogData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating blog:", error);
        throw error;
    }
};

export const deleteBlog = async (id) => {
    try {
        const response = await axiosInstance.delete(`/blogs/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting blog:", error);
        throw error;
    }
};