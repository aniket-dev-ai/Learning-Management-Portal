import multer from "multer";
import path from "path";

// 🛠️ Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ✅ Files "uploads/" folder me save hongi
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // ✅ Extract extension
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName); // ✅ Save with unique filename
  },
});

// 🛑 File Type Filter (Only Images Allowed)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png, gif) are allowed!"));
  }
};

// 🚀 Multer Upload Middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // ✅ Max size: 5MB
});

export default upload;
