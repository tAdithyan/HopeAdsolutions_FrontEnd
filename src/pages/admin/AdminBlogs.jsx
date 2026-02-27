import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X, Image as ImageIcon } from "lucide-react";
import { fetchBlogs, createBlog, updateBlog, deleteBlog as deleteBlogApi } from "../../data/blogs";
import Loading from "../../components/common/Loading";

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        author: "",
        Excerpt: "", // Changed from excerpt to match backend
        content: "",
        readTime: "5 min read"
    });

    const refreshBlogs = async () => {
        try {
            setLoading(true);
            const data = await fetchBlogs();
            setBlogs(data || []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshBlogs();
    }, []);

    const openModal = (blog = null) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({
                title: blog.title,
                category: "Technology", // Default or fetch from backend if available
                author: "Admin", // Default or fetch from backend
                Excerpt: blog.Excerpt,
                content: blog.content,
                readTime: "5 min read"
            });
            setImageFile(null);
        } else {
            setEditingBlog(null);
            setFormData({
                title: "",
                category: "",
                author: "",
                Excerpt: "",
                content: "",
                readTime: "5 min read"
            });
            setImageFile(null);
        }
        setIsModalOpen(true);
    };

    const [imageError, setImageError] = useState("");


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB
                setImageError("Image size must be less than 5MB");
                setImageFile(null);
                e.target.value = ""; // Clear input
            } else {
                setImageError("");
                setImageFile(file);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('Excerpt', formData.Excerpt);
        if (imageFile) {
            data.append('image', imageFile);
        }

        try {
            if (editingBlog) {
                await updateBlog(editingBlog._id, data);
            } else {
                await createBlog(data);
            }
            await refreshBlogs();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving blog:", error);
            const errorMessage = error.response?.data?.error
                ? (Array.isArray(error.response.data.error) ? error.response.data.error.join(", ") : error.response.data.error)
                : "Failed to save blog. Please try again.";
            alert(errorMessage);
        } finally {
            setActionLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                setActionLoading(true);
                await deleteBlogApi(id);
                await refreshBlogs();
            } catch (error) {
                console.error("Error deleting blog:", error);
            } finally {
                setActionLoading(false);
            }
        }
    };

    if (loading && blogs.length === 0) {
        return <Loading />;
    }

    return (
        <div>
            {actionLoading && <Loading fullScreen />}
            <div className="flex items-center justify-between mb-8">
                <h1 className="font-['Oswald'] text-3xl font-bold text-[#111827]">Manage Blogs</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-[#FF8A00] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#e67c00] transition-colors"
                >
                    <Plus size={20} />
                    Add New Blog
                </button>
            </div>

            {/* Blogs List */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-6 font-bold text-gray-500 uppercase text-xs tracking-wider">Title</th>
                            <th className="p-6 font-bold text-gray-500 uppercase text-xs tracking-wider">Excerpt</th>
                            <th className="p-6 font-bold text-gray-500 uppercase text-xs tracking-wider">Image</th>
                            <th className="p-6 font-bold text-gray-500 uppercase text-xs tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {blogs.map(blog => (
                            <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-6">
                                    <div className="font-bold text-[#111827]">{blog.title}</div>
                                </td>
                                <td className="p-6">
                                    <div className="text-gray-400 text-sm mt-1 truncate max-w-xs">{blog.Excerpt}</div>
                                </td>
                                <td className="p-6">
                                    {blog.image && (
                                        <img
                                            src={`${blog.image}`}
                                            alt={blog.title}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                    )}
                                </td>
                                <td className="p-6 text-right space-x-2">
                                    <button
                                        onClick={() => openModal(blog)}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => deleteBlog(blog._id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-['Oswald'] text-2xl font-bold text-[#111827]">
                                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none transition-all"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Image</label>
                                <div className="flex gap-4 items-center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none transition-all"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                {imageError && (
                                    <div className="mt-2 text-sm text-red-500 font-bold">
                                        {imageError}
                                    </div>
                                )}
                                {editingBlog && editingBlog.image && !imageFile && (
                                    <div className="mt-2 text-sm text-gray-500">
                                        Current Image: <a href={editingBlog.image} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt</label>
                                <textarea
                                    rows="2"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none transition-all"
                                    value={formData.Excerpt}
                                    onChange={e => setFormData({ ...formData, Excerpt: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Content (HTML Support)</label>
                                <textarea
                                    rows="6"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none transition-all font-mono text-sm"
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="<p>Write your article content here...</p>"
                                />
                            </div>

                            <button type="submit" className="w-full bg-[#111827] text-white font-bold py-4 rounded-xl hover:bg-black transition-colors">
                                {editingBlog ? 'Update Blog Post' : 'Publish Blog Post'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBlogs;
