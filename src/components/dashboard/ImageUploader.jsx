import { useState, useRef, useEffect } from "react";
import { uploadBanner, getAllBanner } from "../../api/uploadBannerApi.js";
import { Trash2, Eye, Upload } from "lucide-react";
import toast from "react-hot-toast";

export default function BannerUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [bannerName, setBannerName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch all banners on component mount
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoadingBanners(true);
      const response = await getAllBanner();
      setBanners(response.data.banners || []);
    } catch (error) {
      console.error("Error fetching banners:", error);
      toast.error("Failed to load banners");
    } finally {
      setLoadingBanners(false);
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Upload handler
  const handleUpload = async () => {
    if (!selectedImage || !bannerName.trim()) {
      toast.error("Please select an image and enter a banner name.");
      return;
    }

    setUploading(true);
    try {
      await uploadBanner(selectedImage, bannerName);
      toast.success("✅ Banner uploaded successfully!");

      // Reset all fields after upload
      setSelectedImage(null);
      setPreviewUrl(null);
      setBannerName("");
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Refresh banners list
      await fetchBanners();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error?.response?.data?.message || "❌ Failed to upload banner"
      );
    } finally {
      setUploading(false);
    }
  };

  // Delete banner handler
  const handleDeleteClick = (banner) => {
    setBannerToDelete(banner);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!bannerToDelete) return;

    setDeleting(true);
    try {
      await deleteBanner(bannerToDelete._id);
      toast.success("✅ Banner deleted successfully!");

      // Remove from local state
      setBanners((prev) =>
        prev.filter((banner) => banner._id !== bannerToDelete._id)
      );
      setShowDeleteModal(false);
      setBannerToDelete(null);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("❌ Failed to delete banner");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Upload Section */}
      <div className="w-full max-w-md mx-auto p-6 mb-8 border rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#FF6B00]">
          Upload New Banner
        </h2>

        {/* Banner Name Input */}
        <input
          type="text"
          placeholder="Enter Banner Name"
          value={bannerName}
          disabled={uploading}
          onChange={(e) => setBannerName(e.target.value)}
          className={`w-full mb-3 p-2 border rounded-md text-sm focus:outline-[#FF6B00] ${
            uploading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        />

        {/* File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={handleImageChange}
          className={`w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-[#FF6B00] file:text-white
                     hover:file:bg-[#e55c00] cursor-pointer ${
                       uploading ? "opacity-70 cursor-not-allowed" : ""
                     }`}
        />

        {/* Recommended Resolution */}
        <p className="mt-2 text-xs text-gray-500 text-center">
          📏 Recommended resolution: <b>2560 × 1707 px</b> for best quality
        </p>

        {/* Preview Image */}
        {previewUrl && (
          <div className="mt-4 animate-fadeIn">
            <p className="text-sm text-gray-500 mb-2">Preview:</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto max-h-96 object-contain border rounded-md shadow-sm"
            />
          </div>
        )}

        {/* Upload Button */}
        {previewUrl && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`mt-4 w-full bg-[#FF6B00] hover:bg-[#e55c00] text-white font-medium py-2 rounded-md transition-all flex items-center justify-center ${
              uploading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Uploading..." : "Upload Banner"}
          </button>
        )}
      </div>

      {/* Existing Banners Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Existing Banners ({banners.length})
          </h3>
          <button
            onClick={fetchBanners}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md transition-colors"
          >
            Refresh
          </button>
        </div>

        {loadingBanners ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B00] mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading banners...</p>
          </div>
        ) : banners.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Upload className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p>No banners uploaded yet</p>
            <p className="text-sm">Upload your first banner above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Banner Image */}
                <div className="relative group">
                  <img
                    src={banner.photoUrl}
                    alt={banner.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => window.open(banner.photoUrl, "_blank")}
                      className="bg-white bg-opacity-90 p-2 rounded-full mr-2 hover:bg-opacity-100 transition-all"
                    >
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(banner)}
                      className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Banner Info */}
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 truncate">
                    {banner.name}
                  </h4>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>Uploaded: {formatDate(banner.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the banner "
              <strong>{bannerToDelete?.name}</strong>"? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setBannerToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
