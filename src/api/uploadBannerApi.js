import axiosInstance from "./axiosInstance";

/**
 * Upload banner to Cloudinary via backend
 * @param {File} file - Image or PDF file
 * @param {string} name - Banner name or title
 * @returns {Promise<Object>} response.data containing uploaded URL and banner details
 */
export const uploadBanner = async (file, name) => {
  try {
    const formData = new FormData();
    formData.append("file", file);  // 👈 must match multer key in backend
    formData.append("name", name);

    const response = await axiosInstance.post("/banner/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading banner:", error);
    throw (
      error.response?.data?.message ||
      "Failed to upload banner. Please try again."
    );
  }
};


export const getAllBanner = async()=>{
    return axiosInstance.get("/banner/get-all-banner")
}