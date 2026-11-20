"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  X,
  Image as ImageIcon,
  Video,
  Play,
  FolderPlus,
  Loader2,
} from "lucide-react";
import axiosInstance from "../../config/axios"; // <-- adjust to where your instance lives

/* =========================================================
   CONSTANTS
========================================================= */

const MAX_VIDEO_SIZE_MB = 50;
const MAX_VIDEO_SIZE = MAX_VIDEO_SIZE_MB * 1024 * 1024; // 50 MB

/* Default categories (must match backend enum / model) */
const DEFAULT_CATEGORIES = [
  "Bus Advertising",
  "Digital Advertising",
  "Outdoor Advertising",
  "Restaurant Advertising",
  "Events",
  "Branding",
  "Client Campaigns",
  "Projects",
  "Testimonials",
  "Company",
  "Announcements",
  "Other",
];

const formatMB = (bytes) => (bytes / 1024 / 1024).toFixed(1);

/* =========================================================
   COMPONENT
========================================================= */

const AdminGalleryPage = () => {
  const [media, setMedia] = useState([]);
  const [extraCategories, setExtraCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    type: "image",
  });

  /* =========================================================
     CATEGORIES = defaults + any custom / already-used ones
  ========================================================= */

  const categories = useMemo(() => {
    const set = new Set([...DEFAULT_CATEGORIES, ...extraCategories]);
    media.forEach((m) => m.category && set.add(m.category));
    return Array.from(set);
  }, [media, extraCategories]);

  /* =========================================================
     FETCH MEDIA
  ========================================================= */

 const fetchMedia = async () => {
  try {
    setLoading(true);
    setError("");
    const { data } = await axiosInstance.get("/media");
    setMedia(Array.isArray(data.data) ? data.data : []);
  } catch (err) {
    setError(err.response?.data?.message || "Failed to load media.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchMedia();
  }, []);

  /* =========================================================
     MODAL HELPERS
  ========================================================= */

  const openAddModal = () => {
    setEditingMedia(null);
    setFormData({
      title: "",
      category: categories[0] || "",
      description: "",
      type: "image",
    });
    setMediaFile(null);
    setPreviewUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingMedia(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description || "",
      type: item.type,
    });
    setMediaFile(null);
    setPreviewUrl(item.url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setIsModalOpen(false);
    setEditingMedia(null);
    setMediaFile(null);
    setPreviewUrl("");
  };

  /* =========================================================
     FILE CHANGE (type match + 50 MB video limit)
  ========================================================= */

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File must match the selected media type
    if (!file.type.startsWith(`${formData.type}/`)) {
      alert(`Please select a ${formData.type} file.`);
      e.target.value = "";
      return;
    }

    // Block videos larger than 50 MB
    if (file.type.startsWith("video/") && file.size > MAX_VIDEO_SIZE) {
      alert(
        `This video is ${formatMB(file.size)} MB. Maximum allowed size is ${MAX_VIDEO_SIZE_MB} MB.`
      );
      e.target.value = ""; // clear the input

      // Clear any previously selected file so it can't be submitted by mistake
      if (previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
      setMediaFile(null);
      setPreviewUrl(
        editingMedia && editingMedia.type === formData.type
          ? editingMedia.url
          : ""
      );
      return;
    }

    if (previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);

    setMediaFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  /* =========================================================
     TYPE CHANGE (Image / Video)
  ========================================================= */

  const handleTypeChange = (newType) => {
    if (newType === formData.type) return;

    if (previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);

    setFormData((prev) => ({ ...prev, type: newType }));
    setMediaFile(null);

    // Editing and switching back to the original type restores its preview
    setPreviewUrl(
      editingMedia && editingMedia.type === newType ? editingMedia.url : ""
    );
  };

  /* =========================================================
     CREATE CATEGORY (local only – backend stores category
     as a string on each media item)
  ========================================================= */

  const handleCreateCategory = () => {
    const categoryName = newCategory.trim();

    if (!categoryName) {
      alert("Please enter category name.");
      return;
    }

    const exists = categories.some(
      (c) => c.toLowerCase() === categoryName.toLowerCase()
    );

    if (exists) {
      alert("Category already exists.");
      return;
    }

    setExtraCategories((prev) => [...prev, categoryName]);
    setFormData((prev) => ({ ...prev, category: categoryName }));
    setNewCategory("");
    setIsCategoryModalOpen(false);
  };

  /* =========================================================
     SUBMIT (CREATE / UPDATE)
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter media title.");
      return;
    }

    if (!formData.category) {
      alert("Please select a category.");
      return;
    }

    if (!editingMedia && !mediaFile) {
      alert(`Please choose a ${formData.type} file.`);
      return;
    }

    if (
      editingMedia &&
      formData.type !== editingMedia.type &&
      !mediaFile
    ) {
      alert(`Please upload a new ${formData.type} file to change the type.`);
      return;
    }

    // Safety check: video must be 50 MB or smaller
    if (
      mediaFile &&
      mediaFile.type.startsWith("video/") &&
      mediaFile.size > MAX_VIDEO_SIZE
    ) {
      alert(`Video must be ${MAX_VIDEO_SIZE_MB} MB or smaller.`);
      return;
    }

    const body = new FormData();
    body.append("title", formData.title.trim());
    body.append("category", formData.category);
    body.append("type", formData.type);
    body.append("description", formData.description);
    if (mediaFile) body.append("media", mediaFile); // field name must be "media"

    // Default instance header is application/json, so override it for uploads.
    // Axios fills in the multipart boundary automatically.
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    try {
      setSaving(true);

      if (editingMedia) {
        const { data } = await axiosInstance.put(
          `/media/${editingMedia._id}`,
          body,
          config
        );
        setMedia((prev) =>
          prev.map((m) => (m._id === editingMedia._id ? data.data : m))
        );
      } else {
        const { data } = await axiosInstance.post("/media", body, config);
        setMedia((prev) => [data.data, ...prev]);
      }

      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save media.");
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;

    try {
      await axiosInstance.delete(`/media/${id}`);
      setMedia((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete media.");
    }
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredMedia =
    activeCategory === "All"
      ? media
      : media.filter((item) => item.category === activeCategory);

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 md:p-8">
      {/* HEADER */}
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1
            className="text-3xl font-semibold text-[#111827]"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            Media Gallery
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage images and videos for your website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FF8A00] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e97d00]"
        >
          <Plus size={18} />
          Add Media
        </button>
      </div>

      {/* CATEGORY FILTER */}
      <div className="mb-6 flex flex-wrap gap-2">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              activeCategory === category
                ? "border-[#FF8A00] bg-[#FF8A00] text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-[#FF8A00]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* MEDIA TABLE */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F9FAFB]">
                {["Media", "Title", "Category", "Type"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    {h}
                  </th>
                ))}
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <Loader2
                      size={22}
                      className="mx-auto animate-spin text-[#FF8A00]"
                    />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-sm text-red-500"
                  >
                    {error}{" "}
                    <button
                      onClick={fetchMedia}
                      className="font-semibold underline"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ) : filteredMedia.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No media found in this category.
                  </td>
                </tr>
              ) : (
                filteredMedia.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >
                    {/* PREVIEW */}
                    <td className="px-6 py-4">
                      <div className="relative h-16 w-24 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                        {item.type === "image" ? (
                          <img
                            src={item.url}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <>
                            <video
                              src={item.url}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
                                <Play
                                  size={14}
                                  className="ml-0.5 text-[#111827]"
                                  fill="currentColor"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </td>

                    {/* TITLE */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#111827]">{item.title}</p>
                      {item.description && (
                        <p className="mt-1 max-w-[300px] truncate text-xs text-gray-400">
                          {item.description}
                        </p>
                      )}
                    </td>

                    {/* CATEGORY */}
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-[#FF8A00]">
                        {item.category}
                      </span>
                    </td>

                    {/* TYPE */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {item.type === "image" ? (
                          <>
                            <ImageIcon size={16} className="text-gray-500" />
                            <span className="text-sm text-gray-600">Image</span>
                          </>
                        ) : (
                          <>
                            <Video size={16} className="text-gray-500" />
                            <span className="text-sm text-gray-600">Video</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#FF8A00] hover:text-[#FF8A00]"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-red-500 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MEDIA MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2
                  className="text-2xl font-semibold text-[#111827]"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  {editingMedia ? "Edit Media" : "Add Media"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Upload and organize your website media.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              {/* TITLE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Media Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter media title"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#FF8A00] focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setNewCategory("");
                      setIsCategoryModalOpen(true);
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-[#FF8A00] hover:text-[#e97d00]"
                  >
                    <FolderPlus size={15} />
                    Create Category
                  </button>
                </div>

                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FF8A00] focus:ring-2 focus:ring-orange-100"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* TYPE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Media Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "image", label: "Image", Icon: ImageIcon },
                    { value: "video", label: "Video", Icon: Video },
                  ].map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleTypeChange(value)}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                        formData.type === value
                          ? "border-[#FF8A00] bg-orange-50 text-[#FF8A00]"
                          : "border-gray-200 bg-white text-gray-600 hover:border-[#FF8A00]"
                      }`}
                    >
                      <Icon size={16} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* FILE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {formData.type === "video" ? "Video file" : "Image file"}
                </label>
                <input
                  key={formData.type}
                  type="file"
                  accept={formData.type === "video" ? "video/*" : "image/*"}
                  onChange={handleFileChange}
                  className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500"
                />
                <p className="mt-2 text-xs text-gray-400">
                  {formData.type === "video"
                    ? `Supported: MP4, MOV, WEBM (max ${MAX_VIDEO_SIZE_MB} MB)`
                    : "Supported: JPG, PNG, WEBP, GIF"}
                </p>
              </div>

              {/* PREVIEW */}
              {previewUrl && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Preview
                  </label>
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                    {formData.type === "image" ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-72 w-full object-contain"
                      />
                    ) : (
                      <video
                        src={previewUrl}
                        controls
                        className="max-h-72 w-full"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* DESCRIPTION */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter media description"
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#FF8A00] focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-[#FF8A00] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e97d00] disabled:opacity-60"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {saving
                    ? "Saving..."
                    : editingMedia
                    ? "Update Media"
                    : "Add Media"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE CATEGORY MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2
                  className="text-xl font-semibold text-[#111827]"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  Create Category
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Create a category for your media.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category Name
              </label>

              <input
                type="text"
                autoFocus
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCreateCategory();
                  }
                }}
                placeholder="e.g. Corporate Events"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#FF8A00] focus:ring-2 focus:ring-orange-100"
              />

              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleCreateCategory}
                  className="flex items-center gap-2 rounded-xl bg-[#FF8A00] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e97d00]"
                >
                  <FolderPlus size={16} />
                  Create Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGalleryPage;