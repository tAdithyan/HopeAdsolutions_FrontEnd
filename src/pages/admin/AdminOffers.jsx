import { useState, useEffect } from "react";
import { getOffers, createOffer, updateOffer as updateOfferApi, deleteOffer as deleteOfferApi } from "../../data/offers";
import { Pencil, Trash2, Plus, X, Crop } from "lucide-react";
import ImageCropper from "../../components/admin/ImageCropper";
import Loading from "../../components/common/Loading";

const AdminOffers = () => {
    const [offers, setOffers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageError, setImageError] = useState("");
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    // Cropping State
    const [showCropper, setShowCropper] = useState(false);
    const [originalImage, setOriginalImage] = useState(null);
    const [croppedPreview, setCroppedPreview] = useState(null);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    // Form State
    const [formData, setFormData] = useState({
        headline: "",
        subline: "",
        description: "",
        image: ""
    });

    const refreshOffers = async () => {
        try {
            setLoading(true);
            const data = await getOffers();
            setOffers(data.data || []);
        } catch (error) {
            console.error("Error fetching offers:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshOffers();
    }, []);

    const openModal = (offer = null) => {
        if (offer) {
            setEditingOffer(offer);
            setFormData({
                headline: offer.headline,
                subline: offer.subline,
                description: offer.description,
                image: offer.image
            });
        } else {
            setEditingOffer(null);
            setFormData({
                headline: "",
                subline: "",
                description: "",
                image: ""
            });
        }
        setImageFile(null);
        setCroppedPreview(null);
        setImageError("");
        setIsModalOpen(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit for source
                setImageError("Image size must be less than 10MB");
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setOriginalImage(reader.result);
                setShowCropper(true);
            };
        }
    };

    const handleCropComplete = (croppedFile, previewUrl) => {
        setImageFile(croppedFile);
        setCroppedPreview(previewUrl);
        setShowCropper(false);
        setImageError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);

        const data = new FormData();
        data.append('headline', formData.headline);
        data.append('subline', formData.subline);
        data.append('description', formData.description);
        if (imageFile) {
            data.append('image', imageFile);
        }

        try {
            if (editingOffer) {
                await updateOfferApi(editingOffer._id, data);
            } else {
                if (!imageFile) {
                    setImageError("Please select and crop an image");
                    setActionLoading(false);
                    return;
                }
                await createOffer(data);
            }
            await refreshOffers();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving offer:", error);
            const errorMessage = error.response?.data?.error
                ? (Array.isArray(error.response.data.error) ? error.response.data.error.join(", ") : error.response.data.error)
                : "Failed to save offer. Please try again.";
            alert(errorMessage);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this offer?")) {
            try {
                setActionLoading(true);
                await deleteOfferApi(id);
                await refreshOffers();
            } catch (error) {
                console.error("Error deleting offer:", error);
            } finally {
                setActionLoading(false);
            }
        }
    };

    if (loading && offers.length === 0) {
        return <Loading />;
    }

    return (
        <div>
            {actionLoading && <Loading fullScreen />}
            <div className="flex items-center justify-between mb-8">
                <h1 className="font-['Oswald'] text-3xl font-bold text-[#111827]">Manage Offers</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-[#FF8A00] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#e67c00] transition-colors"
                >
                    <Plus size={20} />
                    Add New Offer
                </button>
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offers.map(offer => (
                    <div key={offer._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        <div className="h-48 relative overflow-hidden group">
                            <img src={`${offer.image}`} alt={offer.headline} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-4">
                                <button
                                    onClick={() => openModal(offer)}
                                    className="w-10 h-10 rounded-full bg-white text-[#111827] flex items-center justify-center hover:bg-[#FF8A00] hover:text-white transition-colors"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(offer._id)}
                                    className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="font-['Oswald'] text-xl font-bold text-[#111827] leading-tight mb-2">{offer.headline}</h3>
                            <p className="text-sm font-bold text-[#FF8A00] uppercase tracking-wider mb-4">{offer.subline}</p>
                            <p className="text-gray-500 text-sm mt-auto">{offer.description}</p>
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
                                {editingOffer ? 'Edit Offer' : 'Create New Offer'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Headline</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none transition-all font-['Oswald'] uppercase font-bold"
                                    value={formData.headline}
                                    onChange={e => setFormData({ ...formData, headline: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Subline</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none transition-all"
                                    value={formData.subline}
                                    onChange={e => setFormData({ ...formData, subline: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                <textarea
                                    rows="3"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 outline-none transition-all"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Background Image (2.2:1 Aspect Ratio)</label>

                                <div className="space-y-4">
                                    {/* Preview Area */}
                                    {(croppedPreview || (editingOffer && editingOffer.image)) && (
                                        <div className="relative group rounded-2xl overflow-hidden border-2 border-gray-100 aspect-[2.2/1] bg-gray-50">
                                            <img
                                                src={croppedPreview || `${editingOffer.image}`}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <label className="cursor-pointer bg-white text-[#111827] px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[#FF8A00] hover:text-white transition-colors">
                                                    <Crop size={16} />
                                                    Change Image
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

                                    {!croppedPreview && (!editingOffer || !editingOffer.image) && (
                                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl hover:border-[#FF8A00] hover:bg-orange-50/30 cursor-pointer transition-all group">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-[#FF8A00]/10 transition-colors">
                                                    <Plus size={24} className="text-gray-400 group-hover:text-[#FF8A00]" />
                                                </div>
                                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Upload and Crop Image</p>
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
                                {editingOffer ? 'Update Offer' : 'Publish Offer'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Cropper Modal */}
            {showCropper && (
                <ImageCropper
                    image={originalImage}
                    onCropComplete={handleCropComplete}
                    onCancel={() => setShowCropper(false)}
                    aspect={2.2 / 1}
                />
            )}
        </div>
    );
};

export default AdminOffers;
