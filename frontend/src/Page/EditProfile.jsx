import React, { useState } from "react";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "Aniket Srivastava", // Demo data - dynamically fill kar lena from user API
    email: "aniket@example.com",
    role: "student",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageUrl: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call logic yaha pe daal dena
    console.log("Updated Data:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1e2e] via-[#240046] to-[#3c096c] text-darkText flex justify-center items-center py-10 px-4">
      <div className="bg-darkBg/90 p-6 rounded-lg shadow-xl border border-primary/50 backdrop-blur-lg w-full max-w-2xl space-y-6">
        <h2 className="text-3xl font-bold text-primary text-center">Edit Profile 🌟</h2>

        {/* Profile Image */}
        <div className="flex justify-center">
          <label htmlFor="profileImage" className="cursor-pointer relative">
            <img
              src={formData.imageUrl || "https://via.placeholder.com/150"}
              alt="Profile"
              className="h-32 w-32 rounded-full border-2 border-primary object-cover"
            />
            <span className="absolute bottom-0 right-0 bg-primary text-darkBg text-xs px-2 py-1 rounded-full">✏️</span>
          </label>
          <input
            type="file"
            id="profileImage"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 bg-darkBg/70 border border-primary/50 rounded-lg text-darkText focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email (Readonly) */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full mt-1 px-3 py-2 bg-darkBg/70 border border-muted-foreground/50 rounded-lg text-darkText cursor-not-allowed"
            />
          </div>

          {/* Role (Readonly) */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              readOnly
              className="w-full mt-1 px-3 py-2 bg-darkBg/70 border border-muted-foreground/50 rounded-lg text-darkText cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-primary text-darkText font-semibold py-2 px-6 rounded-lg hover:bg-pink-500 transition-colors duration-300"
            >
              💾 Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
