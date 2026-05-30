import { useState, useEffect } from "react";
import { getClients, createClient, updateClient as updateClientApi, deleteClient as deleteClientApi } from "../../data/clients";
import { Pencil, Trash2, Plus, X, Upload } from "lucide-react";
import Loading from "../../components/common/Loading";

const AdminClients = () => {
    const [clients, setClients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageError, setImageError] = useState("");
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    // Image Preview State
    const [imagePreview, setImagePreview] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        logo: ""
    });

    const refreshClients = async () => {
        try {
            setLoading(true);
            const data = await getClients();
            setClients(data.data || []);
        } catch (error) {
            console.error("Error fetching clients:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshClients();
    }, []);

    const openModal = (client = null) => {
        if (client) {
            setEditingClient(client);
            setFormData({
                name: client.name,
                logo: client.logo
            });
            setImagePreview(`${client.logo}`);
        } else {
            setEditingClient(null);
            setFormData({
                name: "",
                logo: ""
            });
            setImagePreview(null);
        }
        setImageFile(null);
        setImageError("");
        setIsModalOpen(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setImageError("Image size must be less than 5MB");
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setImageError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        if (imageFile) {
            data.append('logo', imageFile);
        }

        try {
            if (editingClient) {
                await updateClientApi(editingClient._id, data);
            } else {
                if (!imageFile) {
                    setImageError("Please select and crop a logo");
                    setActionLoading(false);
                    return;
                }
                await createClient(data);
            }
            await refreshClients();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving client:", error);
            const errorMessage = error.response?.data?.error
                ? (Array.isArray(error.response.data.error) ? error.response.data.error.join(", ") : error.response.data.error)
                : "Failed to save client. Please try again.";
            alert(errorMessage);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            try {
                setActionLoading(true);
                await deleteClientApi(id);
                await refreshClients();
            } catch (error) {
                console.error("Error deleting client:", error);
            } finally {
                setActionLoading(false);
            }
        }
    };

    if (loading && clients.length === 0) {
        return <Loading />;
    }

    return (
        <div>
            {actionLoading && <Loading fullScreen />}
            <div className="flex items-center justify-between mb-8">
                <h1 className="font-['Oswald'] text-3xl font-bold text-[#111827]">Manage Clients</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-[#FF8A00] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#e67c00] transition-colors"
                >
                    <Plus size={20} />
                    Add New Client
                </button>
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {clients.map(client => (
                    <div key={client._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="aspect-square bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
                            <img 
                                src={`${client.logo}`} 
                                alt={client.name} 
                                className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105" 
                            />
                            
                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button
                                    onClick={() => openModal(client)}
                                    className="w-10 h-10 rounded-full bg-white shadow-xl text-[#111827] flex items-center justify-center hover:bg-[#FF8A00] hover:text-white transition-all transform hover:scale-110 active:scale-95"
                                    title="Edit Client"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(client._id)}
                                    className="w-10 h-10 rounded-full bg-white shadow-xl text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 active:scale-95"
                                    title="Delete Client"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-50 flex items-center justify-center min-h-[60px]">
                            <h3 className="text-xs font-black text-[#111827] text-center uppercase tracking-wider line-clamp-2">{client.name}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-['Oswald'] text-2xl font-bold text-[#111827]">
                                {editingClient ? 'Edit Client' : 'Create New Client'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Client Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none transition-all"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Client Logo</label>

                                <div className="space-y-4">
                                    {imagePreview && (
                                        <div className="relative group rounded-2xl overflow-hidden border-2 border-gray-100 aspect-square bg-white p-8 flex items-center justify-center">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="max-w-full max-h-full object-contain"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <label className="cursor-pointer bg-white text-[#111827] px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[#FF8A00] hover:text-white transition-colors">
                                                    <Upload size={16} />
                                                    Change Logo
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleImageChange}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                    {!imagePreview && (
                                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl hover:border-[#FF8A00] hover:bg-orange-50/30 cursor-pointer transition-all group">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-[#FF8A00]/10 transition-colors">
                                                    <Plus size={24} className="text-gray-400 group-hover:text-[#FF8A00]" />
                                                </div>
                                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Upload Logo</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    )}

                                    {imageError && (
                                        <p className="mt-2 text-sm text-red-500 font-bold">{imageError}</p>
                                    )}
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-[#111827] text-white font-bold py-4 rounded-xl hover:bg-black transition-colors">
                                {editingClient ? 'Update Client' : 'Add Client'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminClients;
