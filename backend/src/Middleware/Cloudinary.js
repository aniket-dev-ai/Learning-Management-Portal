import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadmedia = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
    });
    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Cloudinary upload failed");
  }
};

export const deleteMedia = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log("Media deleted successfully");
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw new Error("Cloudinary delete failed");
  }
};

export const deletevideo = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId,{ resource_type: "video" });
        console.log("Video deleted successfully");
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        throw new Error("Cloudinary delete failed");
    }
}