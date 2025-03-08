import { toast } from "sonner";
import {
  useEditProfileMutation,
  useShowProfileQuery,
} from "../feature/api/authApi";
import React, { useEffect, useState } from "react";

const EditProfile = () => {
  const { data, isLoading, error, refetch } = useShowProfileQuery();
  const [editProfile, { isSuccess, error: editProfileError, isLoading: isUpdating }] =
    useEditProfileMutation();

  const [formData, setFormData] = useState({
    name: "",
    image: null,
    previewUrl: "",
  });

  // 🛠️ Set initial data
  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        name: data.user?.name || "",
        previewUrl: data.user?.imageUrl || "https://via.placeholder.com/150",
      }));
    }
  }, [data]);

  // 🎉 Success/Error Handling
  useEffect(() => {
    if (isSuccess) {
      refetch(); // Data refresh karega
      toast.success("Profile updated successfully! 🎉");
    }
    if (editProfileError)
      toast.error(editProfileError.data?.message || "Update failed! ❌");
  }, [isSuccess, editProfileError, refetch]);

  // 🖊️ Input Change Handler
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 📷 Handle Image Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        previewUrl: URL.createObjectURL(file), // Live preview for UI
      });
    }
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (formData.image) formDataToSend.append("file", formData.image); // 🔥 "file" key use karo jo multer me hai

    try {
      await editProfile(formDataToSend);
    } catch (error) {
      console.error("Profile Update Error:", error);
    }
  };

  // 🔄 Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <p className="text-xl font-semibold animate-pulse">
          ⏳ Loading profile...
        </p>
      </div>
    );
  }

  // ❌ Show error state
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-400">
        <p className="text-xl font-semibold">❌ Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center py-10 px-4 bg-gradient-to-b from-[#1e1e2e] via-[#240046] to-[#3c096c] text-white">
      <div className="bg-white/10 p-6 rounded-lg shadow-xl border border-purple-400 backdrop-blur-lg w-full max-w-2xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-purple-300">
          Edit Profile 🌟
        </h2>

        {/* Profile Image */}
        <div className="flex justify-center">
          <label htmlFor="profileImage" className="cursor-pointer relative">
            <img
              src={formData.previewUrl}
              alt="Profile"
              className="h-32 w-32 rounded-full border-2 border-purple-400 object-cover"
            />
            <span className="absolute bottom-0 right-0 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
              ✏️
            </span>
          </label>
          <input
            type="file"
            id="profileImage"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-purple-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 bg-[#1e1e2e] border border-purple-500 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email (Readonly) */}
          <div>
            <label className="block text-sm font-medium text-purple-300">
              Email
            </label>
            <input
              type="email"
              value={data?.user?.email || ""}
              readOnly
              className="w-full mt-1 px-3 py-2 bg-[#1e1e2e] border border-purple-300 rounded-lg text-white cursor-not-allowed"
            />
          </div>

          {/* Role (Readonly) */}
          <div>
            <label className="block text-sm font-medium text-purple-300">
              Role
            </label>
            <input
              type="text"
              value={data?.user?.role || ""}
              readOnly
              className="w-full mt-1 px-3 py-2 bg-[#1e1e2e] border border-purple-300 rounded-lg text-white cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-purple-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-pink-500 transition-all duration-300 flex items-center justify-center"
              disabled={isUpdating} // 🔥 Disable when updating
            >
              {isUpdating ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                  Saving...
                </div>
              ) : (
                "💾 Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
