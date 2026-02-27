import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [blogs, setBlogs] = useState(() => {
        const saved = localStorage.getItem("app_blogs");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("app_blogs", JSON.stringify(blogs));
    }, [blogs]);

    const addBlog = (blog) => {
        const newBlog = { ...blog, id: Date.now(), date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) };
        setBlogs([newBlog, ...blogs]);
    };

    const updateBlog = (id, updatedData) => {
        setBlogs(blogs.map(b => b.id === id ? { ...b, ...updatedData } : b));
    };

    const deleteBlog = (id) => {
        setBlogs(blogs.filter(b => b.id !== id));
    };

    const [offers, setOffers] = useState(() => {
        const saved = localStorage.getItem("app_offers");
        return saved ? JSON.parse(saved) :  [];
    });

    useEffect(() => {
        localStorage.setItem("app_offers", JSON.stringify(offers));
    }, [offers]);

    const addOffer = (offer) => {
        const newOffer = { ...offer, id: Date.now() };
        setOffers([newOffer, ...offers]);
    };

    const updateOffer = (id, updatedData) => {
        setOffers(offers.map(o => o.id === id ? { ...o, ...updatedData } : o));
    };

    const deleteOffer = (id) => {
        setOffers(offers.filter(o => o.id !== id));
    };


    return (
        <DataContext.Provider value={{
            blogs, addBlog, updateBlog, deleteBlog,
            offers, addOffer, updateOffer, deleteOffer,
            
        }}>
            {children}
        </DataContext.Provider>
    );
};
